package com.fpl.app.rest;

public class FPLplayer {
    public int id;
    public int position;
    public boolean is_captain;
    public boolean is_vice_captain;
    public String web_name;
    public String photo;
    public int element_type; //code for position - 1 = GK, 2 = def etc...
    public int points;
    public int event_points;
    public int dreamteam_count;
    public String form;
    public int minutes;
    public int now_cost;
    public String pts_per_game;
    public String selected_by_percent;
    public int goals_scored;
    public int assists;
    public int clean_sheets;
    public double clean_sheets_per90;
    public int goals_conceded;    
    public double goals_conceded_per90;
    public int penalties_saved;
    public int transfered_in_event; // how many people transferred this player in this gw
    public int transferred_out_event;
    public int penalties_missed;
    public int yellow_cards;
    public int red_cards;
    public int saves;
    double saves_per90;
    public int own_goals;
    public int num_bonus_pts; // total num of bonus pts earned this szn
    public int bps; // total bps score for the season -> shows whos playing well
    public String influence;
    public String creativity;
    public String threat;
    public String ict_index;
    public int starts;
    public double starts_per90;
    public String xG;
    public String xA;
    public String xGi;
    public String xG_conceded;
    public double xG_per90;
    public double xA_per90;
    public double xGi_per90;
    public double xG_conceded_per90;
    public String status;


    public FPLplayer(int id, int position, boolean is_captain, boolean is_vice_captain) {
        this.id = id;
        this.position = position;
        this.is_captain = is_captain;
        this.is_vice_captain = is_vice_captain;
    }

    public FPLplayer(int id, int position, boolean is_captain, boolean is_vice_captain, String web_name, String photo, int element_type, int points, int event_points, String pts_per_game, int goals_scored, int assists, double xG_per90, double xA_per90, double xGi_per90, String influence, String threat, int bps, int num_bonus_pts, int clean_sheets, String form, double xG_conceded_per90, double saves_per90, double goals_conceded_per90, int now_cost, String selected_by_percent, String status) {
        this.id = id;
        this.position = position;
        this.is_captain = is_captain;
        this.is_vice_captain = is_vice_captain;
        this.web_name = web_name;
        this.photo = photo;
        this.element_type = element_type;
        this.points = points;
        this.pts_per_game = pts_per_game;
        this.goals_scored = goals_scored;
        this.assists = assists;
        this.xG_per90 = xG_per90;
        this.xA_per90 = xA_per90;
        this.xGi_per90 = xGi_per90;
        this.influence = influence;
        this.threat = threat;
        this.bps = bps;
        this.num_bonus_pts = num_bonus_pts;
        this.clean_sheets = clean_sheets;
        this.form = form;
        this.xG_conceded_per90 = xG_conceded_per90;
        this.saves_per90 = saves_per90;
        this.goals_conceded_per90 = goals_conceded_per90;
        this.now_cost = now_cost;
        this.selected_by_percent = selected_by_percent;
        this.status = status;
        this.event_points = event_points;
    }

    public int getID() {return this.id;}
    public int getPosition(){return this.position;}
    public boolean isCap() {return this.is_captain;}
    public boolean isViceCap() {return this.is_vice_captain;}
    
}
