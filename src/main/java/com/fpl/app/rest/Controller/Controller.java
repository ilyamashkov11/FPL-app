package com.fpl.app.rest.Controller;

import java.io.IOException;

// import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fpl.app.rest.RestApiApplication;
import org.json.JSONObject;
import com.fpl.app.rest.Controller.SearchRequest;

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
    public String search(@RequestBody String requestBody) throws IOException {
        if (requestBody.isBlank()) { return "";}
        System.out.println(requestBody);
        // SearchRequest searchRequest = objectMapper.readValue(requestBody, SearchRequest.class);
        // String userInput = searchRequest.data(); // Use the accessor method to get the data
        JSONObject jsonObj = new JSONObject();
        jsonObj.put("data", requestBody);
        return jsonObj.toString();
    }
}
