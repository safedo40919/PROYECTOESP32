#include <WiFi.h>
#include "LiquidCrystal_I2C.h"
#include <HTTPClient.h>
#include <ArduinoJson.h>

const char *ssid = "Dios es bello";
const char *password = "Rgm84074065";
const int pinSensor = 16; // Faltaba un punto y coma aquí
LiquidCrystal_I2C lcd(0x27, 16, 2);

void msg(String message)
{ // Se agregó el tipo de retorno 'void' antes del nombre de la función
  lcd.print(message);
  delay(1000);
  lcd.clear();
}

void setup()
{

  Serial.begin(9600);

  // Iniciando lcd
  lcd.init();
  lcd.backlight();

  // Conectar a la red WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED)
  {
    msg("error wifi");
  }

  // Mensaje de la conexión de wifi en pantalla
  msg("coneccion de wifi estable");
}

void loop()
{
  int sensor = digitalRead(pinSensor);
  HTTPClient res;

  if (sensor == HIGH)
  {
    res.begin(String("http://127.0.0.1:3000/user"));

    int statuscode = res.get();

    if (statuscode > 0)
    {
      String data = res.getString();
      msg(data);
    }
  }
  else
  {
    msg("No hay movimiento");
  }
}
