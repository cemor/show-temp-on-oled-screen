# Show Your Garden's Temperature on a Screen

## Introduction @unplugged
In this tutorial you're going to learn how to read the temperature of your garden using a temperature sensor and how to make that reading show up on an OLED screen.
The OLED screen is way easier to read than your micro:bit's LED screen and can show a lot more information.

## Step 1 @unplugged
First we need to set up our OLED screen. Plug your OLED screen into the I2C port on your grove shield. 
Visit this part of the LEaFS website if you need to see what this looks like: https://bit.ly/build-temperature-sensor

## Step 2 
Let's use code to turn on our LED screen. Add an ``||OLED:initialize OLED||`` block to ``||basic:on start||``
and make sure that the width of your OLED says 128 and the height says 64. 
Let's also add a welcome message that will show up when we turn the OLED screen on. Add an  ``||OLED:OLED show string||`` block and change the text so it says something like "starting program".

``` blocks
OLED.init(128, 64)
OLED.writeStringNewLine("starting program..")
```


## Step 3 
We don't want that message to stay on the screen forever. So let's add a ``||Basic:pause||`` block and change the time to 2 seconds.
Then, add an ``||OLED: clear OLED display||`` block after the code you just wrote. 

``` blocks 
OLED.init(128, 64)
OLED.writeStringNewLine("starting program..")
basic.pause(2000)
OLED.clear()
```

## Step 4 @unplugged
To read the temperature in your garden you have to use the temperature and humidity sensor. 
Make sure you have the humidity sensor plugged into pin 0 on your grove shield. 
Visit this page on the LEaFS website if you need to see what this looks like: ADD LINK

## Step 5

Now that your sensor is plugged in, lets code it to figure out what the temperature in your garden is. 
Grab a ``||DHT11_DHT22:Query||`` block from the ``||DHT11_DHT22:DHT11/DHT22 category||`` and drag it into the ``||basic:forever||`` block.  Make sure all of the ``||Logic:true/false||`` statements say `True` and that you have selected "DHT22".


``` blocks
basic.forever(function () {
    dht11_dht22.queryData(
    DHTtype.DHT22,
    DigitalPin.P0,
    true,
    true,
    true
    )
  
})
```

## Step 6 @unplugged 

The next thing we're going to do is create something called a variable. 
You can think of a variable like a big bucket that holds a bunch of the same type of stuff, like a laundry basket that holds all your dirty clothes. 
In our program, we're going to make a bucket (a variable) that holds all of our temperature readings so that we can easily use those readings in our program.


## Step 7
We need to make a variable for the temperature data that our temperature and humidity sensor is reading.
Click on the ``||Variables:variables||`` drawer and click  ``||Variables:Make a Variable||`` to make a new variable.
This sensor reads the temperature in degrees celsius, so let's name our variable "TempC".
Now grab a ``||variables:set||`` block and place it in the ``||basic:forever||`` loop underneath of the ``||DHT11_DHT22:query||`` block . 
Grab a ``||DHT11_DHT22:read||`` block and place it in the blank space of your``||variables:set TempC to||`` block. 
Change the drop down to "temperature".

``` blocks
basic.forever(function () {
    dht11_dht22.queryData(
    DHTtype.DHT22,
    DigitalPin.P0,
    true,
    true,
    true
    )
    TempC = dht11_dht22.readData(dataType.temperature)
})
```


## Step 8 
Most of us are more familiar with reading the temperature in degrees Fahrenheit so lets put together some code that changes the temperature reading from Celsius to Fahrenheit.
The first thing you'll need to do is create a variable, let's call it "TempF". Click on the  ``||Variables:variables||``  drawer and click  ``||Variables:Make a Variable||`` to make a new variable.
Change the name of the variable to "TempF". Now grab a ``||variables:set||`` block and place it in the ``||basic:forever||`` loop underneath your ``|| Variables: set TempC to||`` block. 
Make sure that "TempF" is selected from the dropdown menu on this block. 

``` blocks
basic.forever(function () {
    dht11_dht22.queryData(
    DHTtype.DHT22,
    DigitalPin.P0,
    true,
    true,
    true
    )
    TempC = dht11_dht22.readData(dataType.temperature)
    TempF = 0
})
```

## Step 9
There's a formula that we need to know to convert the temperature from Celsius to Fahrenheit: (0°C × 9/5) + 32. 
Let's break it down step by step. 

The first thing we need to do is divide the temperature reading by 5.
Grab a ``||math:division||`` block from the math drawer and drag it to the blank space in your ``||variables: set tempF to||`` block.
On the left side of the division sign, drag in a rounded ``||variables:TempC||`` variable block, on the right side of the division sign type the number 5.

``` blocks
basic.forever(function () {
    dht11_dht22.queryData(
    DHTtype.DHT22,
    DigitalPin.P0,
    true,
    true,
    true
    )
    TempC = dht11_dht22.readData(dataType.temperature)
    TempF = TempC / 5
})
```


## Step 10
Next, grab a ``||math:multiplication||`` block from the math drawer and drag it to an open space on your screen.
Grab the whole division equation that you made in the previous step and drag it into the blank space on the left side of the multiplication sign in your new block.
On the right side of the multiplication sign type the number 9. You can drag this equation back to the ``||variables:set TempF to||`` block or proceed to the next step. 

``` blocks
basic.forever(function () {
    dht11_dht22.queryData(
    DHTtype.DHT22,
    DigitalPin.P0,
    true,
    true,
    true
    )
    TempC = dht11_dht22.readData(dataType.temperature)
    TempF = (TempC / 5) *9
})
```

## Step 11
Almost there! Grab an ``||math:addition||`` block from the math drawer and drag it to an open space on your screen.
Grab the equations that you put together in the previous step and drag them to the space on the left side of the addition sign. 
On the right side of the addition sign type the the number 32. You can drag this equation back to the ``||variables:set TempF to||`` block or proceed to the next step. 

``` blocks
basic.forever(function () {
    dht11_dht22.queryData(
    DHTtype.DHT22,
    DigitalPin.P0,
    true,
    true,
    true
    )
    TempC = dht11_dht22.readData(dataType.temperature)
    TempF = ((TempC / 5) *9) +32
})
```

## Step 12 
One more thing, if we leave the equation like this it will give us a long number with lots of decimal places. 
Let's round the number up. 

Grab a ``||math: round||`` block from the math drawer and drag it to an open space on your screen.
Drag all of the equations you put together into the empty space in the ``||math:round||`` round block and then drag the whole thing to the space next to your ``||variables: set TempF to||`` block.

``` blocks
basic.forever(function () {
    dht11_dht22.queryData(
    DHTtype.DHT22,
    DigitalPin.P0,
    true,
    true,
    true
    )
    TempC = dht11_dht22.readData(dataType.temperature)
    TempF = Math. round ((TempC / 5) *9 + 32)

})
```
## Step 13
Let's put everything together. To show the temperature reading on your OLED screen grab an ``||OLED:OLED show string||`` block and place it underneath of both of your ``||variables:set temp to||`` blocks. 
Click on the advanced drawer and then click on the  ``||text:Text||`` drawer  and find the block that says ``||text: join ||``. Drag this block into the ``||OLED:show string ||`` block
In the first blank of the ``||text:join ||`` block write a message like "My garden temperature is" and in the next blank drag in a rounded ``||variables: tempF||`` block. 
 


``` blocks
basic.forever(function () {
    dht11_dht22.queryData(
    DHTtype.DHT22,
    DigitalPin.P0,
    true,
    true,
    true
    )
    TempC = dht11_dht22.readData(dataType.temperature)
    TempF = Math. round ((TempC / 5) *9 + 32)
    OLED.writeStringNewLine("My garden temperature is: " + TempF)

})
```

## Step 14
This next piece of code will control how often your temperature reading shows up on the screen. 
Add a ``||basic:pause||`` block underneath of the  ``||OLED:show string||`` block and change the time to 5 seconds. 
This will update the temperature every 5 seconds. 
Then add an ``||OLED: clear OLED display ||`` block underneath of that. 


``` blocks
basic.forever(function () {
    dht11_dht22.queryData(
    DHTtype.DHT22,
    DigitalPin.P0,
    true,
    true,
    true
    )
    TempC = dht11_dht22.readData(dataType.temperature)
    TempF = Math. round ((TempC / 5) *9 + 32)
    OLED.writeStringNewLine("My garden temperature is: " + TempF)
    basic.pause(5000)
    OLED.clear()

})
```

## Step 15
Now it's time to test your program! Download the code and see what happens. Don't forget that you can find resources and help on the LEaFS website if something isn't working. 

``` package
pxt-DHT11_DHT22=github:alankrantas/pxt-DHT11_DHT22#v0.0.2
oled=github:tinkertanker/pxt-oled-ssd1306

```