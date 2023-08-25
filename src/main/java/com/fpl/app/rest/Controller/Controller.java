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
        String toReturn[] = RestApiApplication.containsAnyLetters(formatted) ? RestApiApplication.findTeamNameInDB(formatted) : RestApiApplication.findIDinDB(formatted);
        JSONObject jsonObj = new JSONObject();
        jsonObj.put("data", toReturn);
        return jsonObj.toString();
    }

    @GetMapping("/api/player/leagues")
    public String getPlayerLeagues() throws JsonProcessingException {
        // List<String[]> list = new ArrayList<>();
        // JSONObject jsonObj = new JSONObject();
        // String[] s = new String[2];
        // s[0] = "TestLeague";
        // s[1] = "1";
        // String[] s1 = new String[2];
        // s1[0] = "wow";
        // s1[1] = "2";
        // list.add(s);
        // list.add(s1);
        // jsonObj.put("data", list);
        // System.out.println(jsonObj.toString());

        // String string = RestApiApplication.convertToReadableJSON(jsonObj.toString());
        // System.out.println(string);
        // list.add(s);

        ObjectMapper objectMapper = new ObjectMapper();
        List<PlayerLeague> list = new ArrayList<>();
        PlayerLeague league = new PlayerLeague("OMG IT WORKS", "1");
        PlayerLeague league1 = new PlayerLeague("test1", "10");
        list.add(league);
        list.add(league1);
        String jsonString = objectMapper.writeValueAsString(list);
        System.out.println(jsonString);
        return jsonString;
    }
}
