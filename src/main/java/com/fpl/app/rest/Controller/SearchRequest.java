package com.fpl.app.rest.Controller;
import com.fasterxml.jackson.annotation.JsonAlias;

public record SearchRequest(@JsonAlias("data") String data) {}

