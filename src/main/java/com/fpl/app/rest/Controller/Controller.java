package com.fpl.app.rest.Controller;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fpl.app.rest.PlayerLeague;
import com.fpl.app.rest.RestApiApplication;
import com.fpl.app.rest.Player;
import org.json.JSONObject;

@RestController
public class Controller {
    private final ObjectMapper objectMapper;

    public Controller(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
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
        System.out.println("\n================ API CONNECTED ==============\n");
        ObjectMapper objectMapper = new ObjectMapper();
        if (requestBody.isBlank()) { return "was enpty";}
        if (!requestBody.contains("[")) {
            // System.out.println("requestBody: "+requestBody);
            JsonNode jsonNode = objectMapper.readTree(requestBody);
            
            String teamName = jsonNode.get("value").asText();
            String user_id = jsonNode.get("user_id").asText();
            
            List<PlayerLeague> list = RestApiApplication.getUserLeagues(teamName, user_id, objectMapper);
            
            String jsonString = objectMapper.writeValueAsString(list);
            return jsonString;
        } else {
            String[][] inputArray = new ObjectMapper().readValue(requestBody, String[][].class);
            String user_id = inputArray[0][0];
            String value = inputArray[0][1].replaceAll("^\"|\"$", "");
            System.out.println("user id: " + user_id + " \nvalue: " + value);

            JSONObject jsonObject = new JSONObject();
            jsonObject.put("user_id", user_id);
            jsonObject.put("value", value);
            
            String newRequestBody = jsonObject.toString();
            // System.out.println("new request body: " + newRequestBody);
            JsonNode jsonNode = objectMapper.readTree(newRequestBody);
            
            String teamName1 = jsonNode.get("value").asText();
            String user_id1 = jsonNode.get("user_id").asText();
            
            List<PlayerLeague> list = RestApiApplication.getUserLeagues(teamName1, user_id1, objectMapper);
            // System.out.println("the leagues" + list.toString());
            
            String jsonString = objectMapper.writeValueAsString(list);
            return jsonString;
        }
    }

    @PostMapping("/api/get-user-team")
    public String getUserFPL(@RequestBody String requestBody) throws IOException {
        if (requestBody.isBlank()) { return "was empty";}
        ObjectMapper objMapper = new ObjectMapper();
        String formatted = requestBody.replace("\"", "").toLowerCase();
        Player player = RestApiApplication.getUserFPLInfo(formatted);
        String playerTeamInfo = objMapper.writerWithDefaultPrettyPrinter().writeValueAsString(player);
        System.out.println(playerTeamInfo);
        return playerTeamInfo;
    }
}
