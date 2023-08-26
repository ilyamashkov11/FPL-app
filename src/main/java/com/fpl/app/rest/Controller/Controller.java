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

    @PostMapping("/api/player/leagues")
    public String getPlayerLeagues(@RequestBody String requestBody) throws JsonProcessingException {
        if (requestBody.isBlank()) { return "";}
        ObjectMapper objectMapper = new ObjectMapper();
        String formatted = requestBody.replace("\"", "").toLowerCase();

        List<PlayerLeague> list = new ArrayList<>();
        PlayerLeague league = new PlayerLeague("OMG I DID IT", "1");
        PlayerLeague league1 = new PlayerLeague("test1", "10");   
        PlayerLeague league2 = new PlayerLeague("test2", "10");
        PlayerLeague league3 = new PlayerLeague("test3", "10");       
        PlayerLeague league4 = new PlayerLeague("test3", "10");
        PlayerLeague league5 = new PlayerLeague("test3", "10");
        PlayerLeague league6 = new PlayerLeague("test3", "10");
        PlayerLeague league7 = new PlayerLeague("test3", "10");


        list.add(league);
        list.add(league1);
        list.add(league2);
        list.add(league3);        
        list.add(league4);
        list.add(league5);
        list.add(league6);        
        list.add(league7);        list.add(league6);
        list.add(league6);



        String jsonString = objectMapper.writeValueAsString(list);
        System.out.println(jsonString);
        return jsonString;
    }
}
