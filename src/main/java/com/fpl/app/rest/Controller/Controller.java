package com.fpl.app.rest.Controller;

import java.io.IOException;
import java.sql.SQLException;

// import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
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
        // System.out.println(requestBody);
        String formatted = requestBody.replace("\"", "").toLowerCase(); // strings in requestbody have double quotes for some reason
        String toReturn = RestApiApplication.findInDB(formatted);

        JSONObject jsonObj = new JSONObject();
        jsonObj.put("data", toReturn);
        return jsonObj.toString();
    }
}
