package com.fpl.app.rest.Controller;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

// import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fpl.app.rest.PlayerLeague;
import com.fpl.app.rest.RestApiApplication;
import org.json.JSONObject;

@RestController
public class Controller {
    private final ObjectMapper objectMapper;

    public Controller(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @GetMapping("/api/league")
    public String[] leagues() throws IOException {
        return RestApiApplication.getLeagueStandings();
    }

    @PostMapping("/api/search")
    public String search(@RequestBody String requestBody) throws IOException, SQLException, ClassNotFoundException {
        if (requestBody.isBlank()) { return "";}
        String formatted = requestBody.replace("\"", "").toLowerCase(); // strings in requestbody have double quotes for some reason
        String toReturn[][] = RestApiApplication.containsAnyLetters(formatted) ? RestApiApplication.findTeamNameInDB(formatted) : RestApiApplication.findIDinDB(formatted);
        ObjectMapper objectMapper = new ObjectMapper();
        String json = objectMapper.writeValueAsString(toReturn);
        return json;
    }

    @PostMapping("/api/player/leagues")
    public String getPlayerLeagues(@RequestBody String requestBody) throws SQLException, IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        if (requestBody.isBlank()) { return "was enpty";}
        // System.out.println(requestBody);
        JsonNode jsonNode = objectMapper.readTree(requestBody);

        String teamName = jsonNode.get("value").asText();
        String user_id = jsonNode.get("user_id").asText();

        List<PlayerLeague> list = RestApiApplication.getUserLeagues(teamName, user_id, objectMapper);

        String jsonString = objectMapper.writeValueAsString(list);
        return jsonString;
    }
}
