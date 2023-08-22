package com.fpl.app.rest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Map;

import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootApplication
public class RestApiApplication {
    private static String league_id = "265617";

    public static final String jdbcUrl = "jdbc:mysql://localhost:3306/FPL-tables";
    public static final String username = "root";
    public static final String password = "Chelsea11";
    public static Connection connection = null;;

    /*
     * ALL API ENDPOINTS
     */
    // private static String bootstrap_url =
    // "https://fantasy.premierleague.com/api/bootstrap-static/";
    private static String league_standings__url = "https://fantasy.premierleague.com/api/leagues-classic/" + league_id
            + "/standings/";
    private static String my_info_url = "https://fantasy.premierleague.com/api/me/";
    // private static String element_url =
    // "https://fantasy.premierleague.com/api/me/";
    // private static String manager_url =
    // "https://fantasy.premierleague.com/api/entry/";

    // * My personal authentication coookie that can be used to authenticate certain
    // API endpoints */
    private static String auth_cookie = "OptanonAlertBoxClosed=2023-07-10T07:25:16.449Z; pl_profile=\"eyJzIjogIld6SXNOVE13T1RRd09EaGQ6MXFUREdZOlRjdnBxekg1RjhZa1IzeHhGM3hkUkcyUktrcHoxY29VcTNyWjdKS09hNE0iLCAidSI6IHsiaWQiOiA1MzA5NDA4OCwgImZuIjogIklseWEiLCAibG4iOiAiTWFzaGtvdiIsICJmYyI6IDh9fQ==\"; csrftoken=Msq5b2WrTssjMgbGYMeR3dGnTKzLEiwV; sessionid=.eJxVy7sKAjEQheF3SS3LxMlkEjt7QWGxDrlMiLjI4rqV-O5mOy0P3_nfKsT11cK6yDPcijooQvAGnFO7X0ox3-Wx-TzVeRo2GS6na7dlHM_HPv-DFpfW396iQUpes1Cx1qOtojWVDFAyiymSqq4x1ch57zhDd2YiLYTsAdXnC_zjMxc:1qTDGZ:s81okhJHb6siD1C6Ed1-ZXaBbg_bZOUD3pspLyJOI3g; _gid=GA1.2.784032826.1691847739; OptanonConsent=isGpcEnabled=0&datestamp=Sun+Aug+13+2023+16%3A07%3A12+GMT%2B1200+(New+Zealand+Standard+Time)&version=202302.1.0&isIABGlobal=false&hosts=&consentId=39f0464c-91bc-468d-a36f-8f9b3ee7dec9&interactionCount=1&landingPath=NotLandingPage&groups=C0001%3A1%2CC0002%3A1%2CC0003%3A1%2CC0004%3A1&geolocation=NZ%3BWGN&AwaitingReconsent=false; _ga=GA1.2.80360647.1688973917; datadome=4SVXRHjbqUzpQBffxnTNhItWZeQ5iK6ghw4IeqBoTSoRihh9yNMGAPVcA5sVnmNojS_0-403wGvxwbUE6dLFyHq-YzOKpKFA4qyDpXGYnbKGu6QWFxCUFOo3xMj41OoC; _dc_gtm_UA-33785302-1=1; _ga_844XQSF4K8=GS1.1.1691898112.44.1.1691899809.23.0.0";

    /**
     * The main method
     * 
     * @param args Command line arguments
     * @throws IOException
     */
    public static void main(String[] args) {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            populateUsersTable();
        } catch (SQLException e) {e.printStackTrace();} catch (ClassNotFoundException n) {n.printStackTrace();}
        SpringApplication.run(RestApiApplication.class, args);
        // getAllPlayersToFile();
    }

    public static void populateUsersTable() throws SQLException, ClassNotFoundException {
        try (Connection connection = ConnectionPoolManager.getDataSource().getConnection()) {
        String firstName = "";
        String latName = "";
        int entry = 90;
        String teamName = "";

        // Do database operations here
        String sql = "INSERT INTO users (entry_id, first_name, last_name, team_name) VALUES (?, ?, ?, ?)";
        PreparedStatement preparedStatement = connection.prepareStatement(sql);
        preparedStatement.setInt(1, entry);
        preparedStatement.setString(2, "firstName");
        preparedStatement.setString(3, "lastName");
        preparedStatement.setString(4, "teamName");

        int rowsAffected = preparedStatement.executeUpdate();
        System.out.println(rowsAffected + " row(s) inserted.");
        }
    }
    // endregion

    // region CONNECTING AND SENDING GET REQUESTS TO APIS
    /**
     * Creates an HTTP client and sends a GET request to a provided API endpoint
     * 
     * @param url the url of the API endpoint that is being accessed
     * @return The response body of the GET request, in the form of a JSON string
     * @throws IOException if an error connecting occurs
     */
    private static String connectToAPI(String url) throws IOException {
        CloseableHttpClient httpClient = HttpClients.createDefault();
        HttpGet get = new HttpGet(url);
        get.setHeader("Cookie", "cookie=" + auth_cookie);

        try (CloseableHttpResponse response = httpClient.execute(get)) {
            String outputBody = EntityUtils.toString(response.getEntity());
            response.close();
            System.out.println("Connection Established Successfuly");
            return convertToReadableJSON(outputBody);
        }
    }

    /**
     * Creates an HTTP client and sends a GET request to a provided API endpoint
     * 
     * @param url  The url of the api endpoint that the connection should be
     *             established between
     * @param keys The names of the desired keys of the JSON map to include in the
     *             output
     * @return A String array. Each String in the array is the body of the specified
     *         JSON key
     * @throws IOException if an error connecting occurs
     */
    private static String[] connectToAPI(String url, String... keys) throws IOException {
        CloseableHttpClient httpClient = HttpClients.createDefault();
        HttpGet get = new HttpGet(url);
        get.setHeader("Cookie", "cookie=" + auth_cookie);

        try (CloseableHttpResponse response = httpClient.execute(get)) {
            String outputBody = EntityUtils.toString(response.getEntity());
            response.close();
            System.out.println("Connection Established Successfuly");
            return convertToReadableJSON(outputBody, keys);
        }
    }
    // endregion

    // region TRANSFORMING THE RESPONSES INTO HUMAN READABLE TEXT
    /**
     * A method to convert the output JSON formatted String, obtained from the GET
     * request, into a human readeable JSON. This returns the entire JSON object as
     * a string. If you are looking to get only certain keys from the JSON map use
     * the overload version of this method that takes keyName(s) as a String
     * parameter.
     * 
     * @param outputBody the string returned from https GET request, written in JSON
     *                   format
     * @return a readeable string that can be printed in an easy to read way
     * @throws JsonProcessingException if there is an error reading the JSON
     *                                 formatted string
     */
    private static String convertToReadableJSON(String outputBody) throws JsonProcessingException {
        ObjectMapper objmapper = new ObjectMapper();
        Map<String, Object> jsonMap = objmapper.readValue(outputBody, new TypeReference<Map<String, Object>>() {
        });
        return objmapper.writerWithDefaultPrettyPrinter().writeValueAsString(jsonMap);
    }

    /**
     * A method to convert the output JSON formatted String, obtained from the GET
     * request, into a human readeable JSON. This version of the method returns an
     * ArrayList<String> where each String is the value of the given keys.
     * 
     * @param outputBody the string returned from https GET request, written in JSON
     *                   format
     * @param keyNames   the names of the keys in the JSON map
     * @return An ArrayList<String> where each string is the value of the given keys
     * @throws JsonProcessingException
     */
    private static String[] convertToReadableJSON(String outputBody, String... keyNames)
            throws JsonProcessingException {
        ObjectMapper objmapper = new ObjectMapper();
        Map<String, Object> jsonMap = objmapper.readValue(outputBody, new TypeReference<Map<String, Object>>() {
        });
        String[] strings = new String[keyNames.length];

        for (int i = 0; i < keyNames.length; i++) {
            strings[i] = (objmapper.writerWithDefaultPrettyPrinter().writeValueAsString(jsonMap.get(keyNames[i])));
        }
        return strings;
    }
    // endregion

    // region DATA PROCESSING
    /**
     * A method that gets all the players in a given league and creates Player
     * objects for them
     * 
     * @param keyNames The String names of the keys in whose body the relevant
     *                 information is
     * @return An ArrayList of every player in the league as a Player objects
     * @throws JsonProcessingException if there is an error processing the string as
     *                                 a JSON
     */
    public static ArrayList<Player> getLeagueRanking(String... keyNames) throws JsonProcessingException {
        ObjectMapper objmapper = new ObjectMapper();
        Map<String, Object> jsonMap1 = objmapper.readValue(keyNames[0], new TypeReference<Map<String, Object>>() {
        });
        ArrayList<Player> players = new ArrayList<>();

        String results_all_info = objmapper.writeValueAsString(jsonMap1.get("results"));
        JsonNode root = objmapper.readTree(results_all_info);
        for (JsonNode node : root) {
            int entry = node.get("entry").asInt();
            int total_score = node.get("total").asInt();
            int score_this_gw = node.get("event_total").asInt();
            String player_name = node.get("player_name").asText();
            String rank_in_league = node.get("rank_sort").asText();
            players.add(new Player(entry, player_name, rank_in_league, total_score, score_this_gw));
        }
        return players;
    }
    // endregion

    // region METHOD TO BE USED BY FRONTEND
    /*
     * METHODS TO BE USED BY FRONTEND
     */
    public static String[] getLeagueStandings() throws IOException {
        ArrayList<Player> league_info = getLeagueRanking(connectToAPI(league_standings__url, "standings"));
        String[] s = new String[league_info.size()];

        for (int i = 0; i < league_info.size(); i++) {
            s[i] = league_info.get(i).toString();
        }
        return s;
    }
    // endregion

}
