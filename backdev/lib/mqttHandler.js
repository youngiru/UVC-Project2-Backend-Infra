const mqtt = require('mqtt');
const logger = require('./logger');

class MqttHandler {
  constructor() {
    this.mqttClient = null;
    this.host = 'mqtt://220.90.129.60';
    // this.username = 'YOUR_USER';
    // this.password = 'YOUR_PASSWORD';
  }

  connect() {
    this.mqttClient = mqtt.connect(this.host, { port: 1834 });
    // Mqtt error callback
    this.mqttClient.on('error', (err) => {
      console.log(err);
      this.mqttClient.end();
    });

    // Connection callback
    this.mqttClient.on('connect', () => {
      console.log('mqtt client connected');
    });

    this.mqttClient.on('close', () => {
      console.log('mqtt client disconnected');
    });
  }

  start(message) { // 작업 시작 버튼 클릭시
    this.mqttClient = mqtt.connect(this.host, { port: 1883 });
    this.mqttClient.on('connect', () => {
      if (message === true) {
        const payload = { tagId: '1', value: '1' };
        this.mqttClient.publish('UVC-EDU-02', JSON.stringify(payload));
        // console.log(`${JSON.stringify(payload)}`);
        logger.debug(`(MQTT.mqttPublish.start) ${JSON.stringify(payload)}`);
      }
    });
    this.mqttClient.on('close', () => {
      logger.debug('mqtt client disconnected');
    });
  }
}

module.exports = MqttHandler;
