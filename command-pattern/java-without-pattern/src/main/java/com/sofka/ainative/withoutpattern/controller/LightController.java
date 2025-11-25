package com.sofka.ainative.withoutpattern.controller;

import com.sofka.ainative.withoutpattern.model.Light;


public class LightController {
    private final Light light;

    public LightController(boolean initial) {
        this.light = new Light(initial);
    }

    public void turnOn() { light.turnOn(); }
    public void turnOff() { light.turnOff(); }

}
