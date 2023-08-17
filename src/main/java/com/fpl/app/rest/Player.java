package com.fpl.app.rest;

public record Player(int id, String name, String leagueRank, int totalScore, int scoreThisWeek) {

    public String toString() {
        return String.valueOf(this.id) + " " + this.name + " " + this.leagueRank + " " + String.valueOf(totalScore) + " " + String.valueOf(scoreThisWeek);
    }
}
