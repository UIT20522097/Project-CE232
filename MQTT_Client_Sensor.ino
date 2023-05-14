///////////////////////////////////////////////////
// Author: Tran Trong Huy                        //
// Project: Smart Garden                         //
// Source:  MQTT Sensor Client                   //
// Description: Read data from DHT11 Sensor,     //
//              Moisture Sensor and send to      //
//              MQTT Broker                      //    
///////////////////////////////////////////////////         
#include <Wire.h>
#include <DHT.h>                                    //thu vien cho cam bien DHT11
#include <WiFi.h>
#include <PubSubClient.h>

//config cho Moisture Sensor 
#define moisturePin 36
float moisture;
int valueMois;

//config cho Temperature and Humidity sensor
#define DHTPIN 4                                    // Khai báo chân kết nối của DHT11
#define DHTTYPE DHT11                               // Khai báo loại cảm biến DHT11
DHT dht(DHTPIN, DHTTYPE);
float humidity;                                     // Khai báo biến lưu trữ độ ẩm
float temperature;                                  // Khai báo biến lưu trữ nhiệt độ

//config cho MQTT 
const char* ssid = "The Sun";                       //SSD WiFi
const char* password = "88888888";                  //Password WiFi
const char* mqtt_server = "192.168.1.164";          //Dia chi IP của broker MQTT
const int mqtt_port = 1883;                         //Port MQTT 

WiFiClient espClient;
PubSubClient client(espClient);

void setup() {
  Serial.begin(115200);
  //Moisture sensor
  //analogReadResolution(12);                       // set ADC resolution to 12 bits (0-4095) 
  pinMode(moisturePin, INPUT);

  //Tempurate sensor 
  dht.begin();
  
  //Connect Wifi
  WiFi.begin(ssid, password);
 
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  
  Serial.println("Connected to WiFi");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());
  Serial.print("Subnet Mask: ");
  Serial.println(WiFi.subnetMask());
  Serial.print("Gateway: ");
  Serial.println(WiFi.gatewayIP());
    
  //MQTT connect 
  client.setServer(mqtt_server, mqtt_port);
}

void loop() {
  //Doc nhiet do va do am tu DHT11
  temperature = dht.readTemperature();
  humidity = dht.readHumidity();
  if (isnan(temperature) || isnan(humidity)) {
    Serial.println("Failed to read from DHT11 sensor!");
    delay(1000);
    return;
  }
  
  //Doc do am dat tu sensor
  valueMois = analogRead(moisturePin);
  moisture = (100-((valueMois/4095.00)*100));

  Serial.print("Nhiet do: ");
  Serial.print(temperature);
  Serial.println(" ºC ");
  Serial.print("Do am khong khi: ");
  Serial.print(humidity);
  Serial.println(" % ");
  Serial.print("Do am dat: ");
  Serial.print(moisture);
  Serial.println(" % ");
  
  //gui du lieu den MQTT broker 
  if (!client.connected()) {
    reconnect();
  }
  client.loop();
  char myMois[10], myTemp[10], myHum[10]; 
  dtostrf(moisture, 6, 2, myMois);          //ep kieu float thanh char
  dtostrf(temperature, 6, 2, myTemp);
  dtostrf(humidity, 6, 2, myHum);

  client.publish("moisture", myMois);
  client.publish("temperature", myTemp);
  client.publish("humidity", myHum);
  //client.publish("pump_state/state", "on/off");
  delay(10000);
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    if (client.connect("ESP32Client")) {
      Serial.println("connected");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      delay(5000);
    }
  }
}
