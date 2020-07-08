let TempF = 0
let TempC = 0
OLED.init(128, 64)
OLED.writeStringNewLine("starting program")
basic.pause(2000)
OLED.clear()
basic.forever(function () {
    dht11_dht22.queryData(
    DHTtype.DHT11,
    DigitalPin.P0,
    true,
    true,
    true
    )
    TempC = dht11_dht22.readData(dataType.temperature)
    TempF = Math.round(dht11_dht22.readData(dataType.temperature) / 5 * 9 + 32)
    OLED.writeStringNewLine("My garden temperature is: " + TempF)
    basic.pause(5000)
    OLED.clear()
})
