package com.sofka.ainative.command.model;

public class Light {
    private boolean isOn = false;

    public Light() {}
    public Light(boolean initial) { this.isOn = initial; }

    public void turnOn() {this.isOn = true; System.out.println("Light -> turned ON");}
    public void turnOff() {this.isOn = false;System.out.println("Light -> turned OFF");}

}
