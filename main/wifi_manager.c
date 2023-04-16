#include "wifi_manager.h"
#include <stdio.h>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "esp_wifi.h"
#include "esp_event.h"
#include "esp_log.h"
#include "esp_netif.h"
#include "esp_system.h"
#include "nvs_flash.h"
#include "arpa/inet.h"

#define WIFI_SSID "Meow"
#define WIFI_PASS "paracetamol"

static const char *TAG = "wifi";

static void wifi_event_handler(void* arg, esp_event_base_t event_base, 
                                int32_t event_id, void* event_data)
{
    if (event_base == WIFI_EVENT && event_id == WIFI_EVENT_STA_START) {
        esp_wifi_connect();
        ESP_LOGI(TAG, "Connecting to WiFi...");
    } else if (event_base == WIFI_EVENT && event_id == WIFI_EVENT_STA_CONNECTED) {
        ESP_LOGI(TAG, "Connected to WiFi");

    } else if (event_base == WIFI_EVENT && event_id == WIFI_EVENT_STA_DISCONNECTED) {
        esp_wifi_connect();
        ESP_LOGI(TAG, "Disconnected from WiFi");
    }
}

void wifi_init(void)
{
    // initialize NVS
    esp_err_t fla = nvs_flash_init();
    if (fla == ESP_ERR_NVS_NO_FREE_PAGES || fla == ESP_ERR_NVS_NEW_VERSION_FOUND) {
        ESP_ERROR_CHECK(nvs_flash_erase());
        fla = nvs_flash_init();
    }
    ESP_ERROR_CHECK( fla );

    esp_err_t ret = esp_netif_init();
    if (ret != ESP_OK) {
        ESP_LOGE(TAG, "Error initializing ESP-NETIF: %s", esp_err_to_name(ret));
        return;
    }

    ESP_LOGI(TAG, "ESP-NETIF Initialized");

    ret = esp_event_loop_create_default();
    if (ret != ESP_OK) {
        ESP_LOGE(TAG, "Error creating default event loop: %s", esp_err_to_name(ret));
        return;
    }

    ESP_LOGI(TAG, "Event Loop Initialized");

    ret = esp_event_handler_register(WIFI_EVENT, ESP_EVENT_ANY_ID, &wifi_event_handler, NULL);
    if (ret != ESP_OK) {
        ESP_LOGE(TAG, "Error registering WiFi event handler: %s", esp_err_to_name(ret));
        return;
    }

    ESP_LOGI(TAG, "WiFi Event Handler Registered");

    esp_netif_create_default_wifi_sta();

    wifi_init_config_t cfg = WIFI_INIT_CONFIG_DEFAULT();
    esp_wifi_init(&cfg);
    esp_wifi_set_mode(WIFI_MODE_STA);

    wifi_config_t wifi_config = {
        .sta = {
            .ssid = WIFI_SSID,
            .password = WIFI_PASS,
        },
    };
    esp_wifi_set_config(WIFI_IF_STA, &wifi_config);
    esp_wifi_start();

    ESP_LOGI(TAG, "WiFi Initialization Complete");
}
