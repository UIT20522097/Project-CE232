#include <string.h>
#include "esp_wifi.h"
#include "esp_http_server.h"
#include "cJSON.h"
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "wifi_manager.h"
#include "esp_log.h"

// static const char *TAG = "HTTP_SERVER";
// Khai báo biến giá trị float
#define ESP_SERVER_IP "192.168.0.112" // IP của ESP32 client

const float data[] = {
    38.35, 22.3 , 34.16, 33.67, 33.88, 26.21, 21.77, 31.98, 32.67,
    21.67, 29.5 , 29.57, 22.35, 34.22, 39.14, 33.51, 29.22, 36.97,
    35.93, 21.42, 37.14, 38.63, 21.2 , 24.54, 23.97, 22.41, 23.83,
    39.36, 23.28, 23.28, 33.7 , 27.23, 20.15, 26.56, 31.45, 27.64,
    29.25, 21.66, 26.63, 37.35, 21.54, 35.74, 28.89, 30.1 , 24.68,
    27.72, 34.94, 23.06, 28.12, 31.49, 22.28, 21.28, 39.92, 21.25,
    37.83, 36.74, 37.4 , 23.58, 30.49, 29.  , 38.98, 20.78, 32.15,
    29.02, 22.95, 26.87, 27.69, 35.41, 34.52, 32.91, 38.11, 25.55,
    23.59, 29.16, 35.63, 30.59, 39.29, 27.33, 22.63, 26.24, 34.16,
    28.23, 37.23, 23.98, 24.77, 37.78, 26.42, 37.94, 21.43, 21.21,
    32.86, 27.21, 32.09, 22.93, 21.42, 39.33, 25.37, 25.9 , 35.56,
    25.44
};

double temperature = 0;
bool fan_state = false;
bool pump_state = false;
bool light_state = false;
// URI handler để xử lý yêu cầu GET
esp_err_t get_handler(httpd_req_t *req)
{
    char query[256];
    if (httpd_req_get_url_query_str(req, query, sizeof(query)) == ESP_OK) {
        char param[32];
        if (httpd_query_key_value(query, "data", param, sizeof(param)) == ESP_OK) {
            // Phân tích dữ liệu JSON từ tham số `data`
            cJSON *root = cJSON_Parse(param);
            if (root == NULL) {
                return ESP_FAIL;
            }
            cJSON *value = cJSON_GetObjectItem(root, "value");
            if (value != NULL) {
                // Chuyển đổi chuỗi thành số float
                float result = strtof(value->valuestring, NULL);
                printf("Received value: %f\n", result);
            }
            cJSON_Delete(root);
        }
    }
    // Gửi mảng `data` dưới dạng JSON trở lại cho client
    cJSON *root = cJSON_CreateArray();
    for (int i = 0; i < sizeof(data) / sizeof(float); i++) {
        cJSON_AddItemToArray(root, cJSON_CreateNumber(data[i]));
    }
    char *payload = cJSON_PrintUnformatted(root);
    cJSON_Delete(root);

    httpd_resp_set_type(req, "application/json");
    httpd_resp_send(req, payload, strlen(payload));

    free(payload);
    return ESP_OK;
}

// URI handler để xử lý yêu cầu POST
esp_err_t post_handler(httpd_req_t *req)
{
    const int max_buf_size = 1024;
    char buf[max_buf_size];
    size_t total_size = 0;
    cJSON *root, *item;
    // read the POST data from the request
    while (total_size < req->content_len) {
        int ret = httpd_req_recv(req, buf + total_size, max_buf_size - total_size);
        if (ret <= 0) {
            if (ret == HTTPD_SOCK_ERR_TIMEOUT) {
                // handle timeout error
            }
            return ESP_FAIL;
        }
        total_size += ret;
    }
    buf[total_size] = '\0';
    // parse the JSON data
    root = cJSON_Parse(buf);
    if (root == NULL) {
        // handle parse error
        httpd_resp_send_err(req, HTTPD_400_BAD_REQUEST, "Invalid JSON data");
        goto exit;
    }

    // extract the data fields
    item = cJSON_GetObjectItem(root, "temperature");
    if (item != NULL && item->type == cJSON_Number) {
        temperature = item->valuedouble;
        // do something with the temperature data
    }

    item = cJSON_GetObjectItem(root, "fan_state");
    if (item != NULL && item->type == cJSON_True) {
        fan_state = true;
        // do something with the fan state data
    } else if (item != NULL && item->type == cJSON_False) {
        fan_state = false;
        // do something with the fan state data
    }

    item = cJSON_GetObjectItem(root, "pump_state");
    if (item != NULL && item->type == cJSON_True) {
        pump_state = true;
        // do something with the pump state data
    } else if (item != NULL && item->type == cJSON_False) {
        pump_state = false;
        // do something with the pump state data
    }

    item = cJSON_GetObjectItem(root, "light_state");
    if (item != NULL && item->type == cJSON_True) {
        light_state = true;
        // do something with the light state data
    } else if (item != NULL && item->type == cJSON_False) {
        light_state = false;
        // do something with the light state data
    }
    // Print data values to the console
    printf("Temperature: %f\n", temperature);
    printf("Fan state: %s\n", fan_state ? "true" : "false");
    printf("Pump state: %s\n", pump_state ? "true" : "false");
    printf("Light state: %s\n", light_state ? "true" : "false");
    // send a response back to the client
    httpd_resp_set_type(req, "application/json");
    httpd_resp_send(req, "{\"status\":\"ok\"}", -1);

    // free resources
    cJSON_Delete(root);
    exit:
    // free(buf);
    return ESP_OK;
}


// Khởi tạo HTTP server
httpd_handle_t start_webserver(void)
{
    httpd_handle_t server = NULL;
    httpd_config_t config = HTTPD_DEFAULT_CONFIG();
    config.server_port = 80;
    if (httpd_start(&server, &config) == ESP_OK) {
        httpd_uri_t get_uri = {
            .uri       = "/value",
            .method    = HTTP_GET,
            .handler   = get_handler,
            .user_ctx  = NULL
        };
        if (httpd_register_uri_handler(server, &get_uri) != ESP_OK) {
            printf("Error registering URI handler for GET\n");
        }
    }
    // post handler
    httpd_uri_t post_uri = {
        .uri       = "/status",
        .method    = HTTP_POST,
        .handler   = post_handler,
        .user_ctx  = NULL
    };
    if (httpd_register_uri_handler(server, &post_uri) != ESP_OK) {
        printf("Error registering URI handler for POST\n");
    }

    return server;
}

void app_main()
{
    // Khởi tạo WiFi
    wifi_init();
    // Delay 5s để kết nối WiFi
    vTaskDelay(5000 / portTICK_PERIOD_MS);
    httpd_handle_t server = NULL;
    // Khởi tạo HTTP server
    server = start_webserver();
    if (server == NULL) {
        printf("Error starting HTTP server\n");
        return;
    }
    printf("HTTP server started\n");

    while (1) {
        // Delay 1s trước khi xử lý yêu cầu tiếp theo
        vTaskDelay(1000 / portTICK_PERIOD_MS);
    }
}