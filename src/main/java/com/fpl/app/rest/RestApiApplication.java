package com.fpl.app.rest;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.json.JSONArray;
import org.json.JSONObject;

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
    public static Connection connection = null;

    /*
     * ALL API ENDPOINTS
     */
    private static String bootstrap_url = "https://fantasy.premierleague.com/api/bootstrap-static/";
    private static String league_standings__url = "https://fantasy.premierleague.com/api/leagues-classic/" + league_id
            + "/standings/";
    private static String my_info_url = "https://fantasy.premierleague.com/api/me/";
    private static String manager_url = "https://fantasy.premierleague.com/api/entry/";

    private static String player_image = "https://resources.premierleague.com/premierleague/photos/players/110x140/p"; // + photo attribute from bootstrap-static

    // * My personal authentication coookie that can be used to authenticate certain
    // API endpoints */
    private static String auth_cookie = "OptanonAlertBoxClosed=2023-07-10T07:25:16.449Z; csrftoken=Msq5b2WrTssjMgbGYMeR3dGnTKzLEiwV; _gid=GA1.2.571040184.1692587203; _ga=GA1.3.80360647.1688973917; OptanonConsent=isGpcEnabled=0&datestamp=Tue+Aug+22+2023+18%3A12%3A29+GMT%2B1200+(New+Zealand+Standard+Time)&version=202302.1.0&isIABGlobal=false&hosts=&consentId=39f0464c-91bc-468d-a36f-8f9b3ee7dec9&interactionCount=1&landingPath=NotLandingPage&groups=C0001%3A1%2CC0002%3A1%2CC0003%3A1%2CC0004%3A1&geolocation=NZ%3BWGN&AwaitingReconsent=false; _ga=GA1.2.80360647.1688973917; datadome=batBZB0~eHAtt1OffuQYca_~QgHsWld0BALqFnFN3UPawWXoRzKuOl9ZLZv8WhVugLEryp0~6kSn~scUZC3w~r~lSeoK24Tnvd8eZTOLjUIpWFN-jgyZk~VPVZ4RpMs; pl_profile=\"eyJzIjogIld6SXNOVE13T1RRd09EaGQ6MXFZS2V5OldYMG1WeldVNnFxUGNGWGtUaUxSVENFZlNJUGZpazc3TTJiRXk2YXlTQzAiLCAidSI6IHsiaWQiOiA1MzA5NDA4OCwgImZuIjogIklseWEiLCAibG4iOiAiTWFzaGtvdiIsICJmYyI6IDh9fQ==\"; _ga_844XQSF4K8=GS1.1.1692683208.78.1.1692684876.60.0.0";

    /**
     * The main method
     * 
     * @param args Command line arguments
     * @throws IOException
     * @throws SQLException
     * @throws ClassNotFoundException
     */
    public static void main(String[] args) throws IOException, SQLException, ClassNotFoundException {
        SpringApplication.run(RestApiApplication.class, args);
    }

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
            // System.out.println("Connection Established Successfuly");
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
        get.setHeader("cookie", "cookie=" + auth_cookie);

        try (CloseableHttpResponse response = httpClient.execute(get)) {
            String outputBody = EntityUtils.toString(response.getEntity());
            response.close();
            // System.out.println("Connection Established Successfuly");
            return convertToReadableJSON(outputBody, keys);
        }
    }
    // endregion

    // region UTIL METHODS
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
    public static String convertToReadableJSON(String outputBody) throws JsonProcessingException {
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

    public static String[][] populateUsersTable(String entry) throws SQLException, ClassNotFoundException, IOException {
        try (Connection connection = ConnectionPoolManager.getDataSource().getConnection()) {
            String sql = "INSERT INTO Users (entry_id, first_name, last_name, team_name) VALUES (?, ?, ?, ?)";
            try {
                Player p = getPlayer(Integer.valueOf(entry), "id", "player_first_name", "player_last_name", "name");
                String entry1 = p.getEntry();
                String firstName = p.getFirstName();
                String lastName = p.getLastName();
                String teamName = p.getTeamName();
                PreparedStatement preparedStatement = connection.prepareStatement(sql);
                preparedStatement.setString(1, entry1);
                preparedStatement.setString(2, firstName);
                preparedStatement.setString(3, lastName);
                preparedStatement.setString(4, teamName);
                int rowsAffected = preparedStatement.executeUpdate();
                System.out.println(rowsAffected + " row(s) inserted.");

                System.out.println("ENTRY VALUE: " + entry);
                String sql2 = "SELECT * FROM Users WHERE entry_id = ?";
                PreparedStatement preparedStatement2 = connection.prepareStatement(sql2);
                preparedStatement2.setString(1, entry1);
                ResultSet result = preparedStatement2.executeQuery();
                String[][] output = new String[1][2];

                if (result.next()) {
                    String entry_id = result.getString("entry_id");
                    String team_name = result.getString("team_name");
                    output[0][0] = entry_id;
                    output[0][1] = team_name;
                    System.out.println(output[0][0] +" "+ output[0][1]);
                    return output;
                } 
            } catch (JsonProcessingException jp) {
                jp.printStackTrace();
            }
            System.out.println("RETURNED NULL");
            return null;
        }
    }

    public static void clearTable() throws SQLException {
        try (Connection connection = ConnectionPoolManager.getDataSource().getConnection()) {
            String deleteQuery = "DELETE FROM Users";
            PreparedStatement preparedStatement = connection.prepareStatement(deleteQuery);
            int rowsDeleted = preparedStatement.executeUpdate(deleteQuery);
            System.out.println(rowsDeleted + " rows deleted.");
        }
    }

    public static Boolean containsAnyLetters(String input) {
        for (int i = 0; i < input.length(); i++) {
            char c = input.toCharArray()[i];
            if (Character.isLetter(c) && !Character.isWhitespace(c)) {
                return true;
            }
        }
        return false;
    }

    private static String[] getCurrentGW() throws IOException {
        String[] apiResponse = connectToAPI(bootstrap_url, "events", "elements");
        int currentGW_id = 0;
        JSONArray EventsJsonArray = new JSONArray(apiResponse[0]);
        for (int i = 0; i < EventsJsonArray.length(); i++) {
            JSONObject event = EventsJsonArray.getJSONObject(i);
            if (event.getBoolean("is_current")) {
                currentGW_id = event.getInt("id");
                break;
            }
        }
        String[] returnArray = new String[2];
        returnArray[0] = String.valueOf(currentGW_id);        
        returnArray[1] = apiResponse[1];
        return returnArray;
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
        Map<String, Object> jsonMap1 = objmapper.readValue(keyNames[0], new TypeReference<Map<String, Object>>() {});
        ArrayList<Player> players = new ArrayList<>();

        String results_all_info = objmapper.writeValueAsString(jsonMap1.get("results"));
        JsonNode root = objmapper.readTree(results_all_info);
        for (JsonNode node : root) {
            int entry = node.get("entry").asInt();
            int total_score = node.get("total").asInt();
            int score_this_gw = node.get("event_total").asInt();
            String player_name = node.get("player_name").asText();
            String rank_in_league = node.get("rank_sort").asText();
            String leagues = node.get("leagues").asText();
            players.add(new Player(entry, player_name, rank_in_league, total_score, score_this_gw, leagues));
        }
        return players;
    }

    public static Player getPlayer(int id, String... keynames) throws IOException {
        String[] result = connectToAPI(manager_url + String.valueOf(id), keynames);
        Player p = new Player(result[0], result[1], result[2], result[3]);
        return p;
    }
    // endregion

    // region API METHODS
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

    public static String[][] findIDinDB(String input) throws SQLException, ClassNotFoundException, IOException {
        String[][] output = new String[1][2];
        try (Connection connection = ConnectionPoolManager.getDataSource().getConnection()) {
            String sqlSelect = "SELECT * FROM Users WHERE entry_id = ?";
            PreparedStatement preparedStatement = connection.prepareStatement(sqlSelect);
            preparedStatement.setString(1, input);
            ResultSet result = preparedStatement.executeQuery();

            if (result.next()) {
                String entry_id = result.getString("entry_id");
                String team_name = result.getString("team_name");
                output[0][0] = entry_id;
                output[0][1] = team_name;
                System.out.println(output[0][0] +" "+ output[0][1]);
                return output;
            } else {
                return populateUsersTable(input);
                // String sqlSelectAgain = "SELECT * FROM Users WHERE entry_id = ?";
                // PreparedStatement preparedStatement = connection.prepareStatement(sqlSelect);
                // preparedStatement.setString(1, input);
                // ResultSet result = preparedStatement.executeQuery();
                // return output;
            }
        }
    }

    public static String[][] findTeamNameInDB(String input) throws SQLException, ClassNotFoundException, IOException {
        System.out.println(input);
        ArrayList<String[]> teamNames = new ArrayList<>();
        try (Connection connection = ConnectionPoolManager.getDataSource().getConnection()) {
            String sql = "SELECT * FROM Users WHERE team_name LIKE ?";
            PreparedStatement preparedStatement = connection.prepareStatement(sql);
            // preparedStatement.setString(1, "\"" + input + "\"");  
            preparedStatement.setString(1, "%" + input + "%");

            ResultSet result = preparedStatement.executeQuery();

            while (result.next()) {
                String teamname = result.getString("team_name");
                String entry_id = result.getString("entry_id");
                String[] teamNameAndID = new String[2];
                teamNameAndID[0] = entry_id;
                teamNameAndID[1] = teamname;
                teamNames.add(teamNameAndID);
            }
            return teamNames.toArray(new String[teamNames.size()][2]);
        }
    }

    public static List<PlayerLeague> getUserLeagues(String teamName, String user_id, ObjectMapper objmapper) throws SQLException, NumberFormatException, IOException {

         String[] result = connectToAPI(manager_url + String.valueOf(user_id), "leagues");
        Map<String, Object> jsonMap = objmapper.readValue(result[0], new TypeReference<Map<String, Object>>() {});
        ArrayList<PlayerLeague> leagues = new ArrayList<>();
        // if(jsonMap != null) {
            String results_all_info = objmapper.writeValueAsString(jsonMap.get("classic")); 
            JsonNode root = objmapper.readTree(results_all_info);
            for (JsonNode node : root) {
                String name = node.get("name").asText();
                String position = node.get("entry_rank").asText();
                PlayerLeague league = new PlayerLeague(name, position);
                leagues.add(league);
            }

        // }
        
        return leagues;
    }

    public static Player getUserFPLInfo(String user_id) throws IOException {
        String[] efficiencyArray = getCurrentGW();
        FPLplayer[] team = new FPLplayer[15];
        String currentGW_id = efficiencyArray[0];
        JSONArray ElementsJsonArray = new JSONArray(efficiencyArray[1]);

        String[] generalTeamInfo = connectToAPI("https://fantasy.premierleague.com/api/entry/" + user_id + "/event/" + String.valueOf(currentGW_id) + "/picks/", "picks", "active_chip", "entry_history");

        JSONArray picksJSONArray = new JSONArray(generalTeamInfo[0]);
        JSONObject event_history = new JSONObject(generalTeamInfo[2]);
        String active_chip = generalTeamInfo[1];

        int team_value = event_history.getInt("value");
        int total_pts = event_history.getInt("total_points");        
        int pts_this_gw = event_history.getInt("points");
        int pts_on_bench = event_history.getInt("points_on_bench");
        int num_transfers_made = event_history.getInt("event_transfers");

        for (int i = 0; i < picksJSONArray.length(); i++) {
            JSONObject playerJSON = picksJSONArray.getJSONObject(i);
            team[i] = new FPLplayer(playerJSON.getInt("element"), playerJSON.getInt("position"), playerJSON.getBoolean("is_captain"), playerJSON.getBoolean("is_vice_captain"));
        }

        List<FPLplayer> detailedTeam = Arrays.stream(team).map((fplplayer) -> {
            int id = fplplayer.getID();
            for (int i = 0; i < ElementsJsonArray.length(); i++) {
                JSONObject element = ElementsJsonArray.getJSONObject(i);
                int element_id = element.getInt("id");
                if (id == element_id) {
                    String web_name = element.getString("web_name");
                    String photo = element.getString("photo");
                    int element_type = element.getInt("element_type");
                    int points = element.getInt("total_points");
                    String pts_per_game = element.getString("points_per_game");
                    int goals_scored = element.getInt("goals_scored");
                    int assists = element.getInt("assists");
                    double xG_per90 = element.getDouble("expected_goals_per_90");
                    double xA_per90 = element.getDouble("expected_assists_per_90");
                    double xGi_per90 = element.getDouble("expected_goal_involvements_per_90");
                    String influence = element.getString("influence");
                    int bps = element.getInt("bps");
                    int num_bonus_pts = element.getInt("bonus");
                    int clean_sheets = element.getInt("clean_sheets");
                    String form = element.getString("form"); 
                    double xG_conceded_per90 = element.getDouble("expected_goals_conceded_per_90");
                    double saves_per90 = element.getDouble("saves_per_90");
                    double goals_conceded_per90 = element.getDouble("goals_conceded_per_90");
                    int cost = element.getInt("now_cost");
                    String threat = element.getString("threat");
                    String selected_by_percent = element.getString("selected_by_percent");
                    String status = element.getString("status");

                    return new FPLplayer(fplplayer.getID(), fplplayer.getPosition(), fplplayer.isCap(), fplplayer.isViceCap(), web_name, photo, element_type, points, pts_per_game, goals_scored, assists, xG_per90, xA_per90, xGi_per90, influence, threat, bps, num_bonus_pts, clean_sheets, form, xG_conceded_per90, saves_per90, goals_conceded_per90, cost, selected_by_percent, status);
                }
            }
            System.out.println("======= something went wrong =======");
            return null;
        }).toList();

        return new Player(user_id, detailedTeam, active_chip, team_value, total_pts, pts_this_gw, pts_on_bench, num_transfers_made);
    }
    // endregion
}
