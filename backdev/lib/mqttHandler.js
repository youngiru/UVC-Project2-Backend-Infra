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

  options(option) { // 작업 시작 버튼 클릭시
    this.mqttClient = mqtt.connect(this.host, { port: 1883 });
    this.mqttClient.on('connect', () => {
      if (option) {
        const inputQuantity = { tagId: '36', value: `${option.inputQuantity}` };
        this.mqttClient.publish('UVC-EDU-02', JSON.stringify(inputQuantity), { qos: 1 });
        logger.debug(`(MQTT.mqttPublish.start) ${JSON.stringify(inputQuantity)}`);

        const leadtime = { tagId: '14', value: `${option.leadtime * 10}` };
        this.mqttClient.publish('UVC-EDU-02', JSON.stringify(leadtime), { qos: 1 });
        logger.debug(`(MQTT.mqttPublish.start) ${JSON.stringify(leadtime)}`);
        if (option.color === 'all') {
          const color = { tagId: '31', value: '1' };
          this.mqttClient.publish('UVC-EDU-02', JSON.stringify(color), { qos: 1 });
          logger.debug(`(MQTT.mqttPublish.start) ${JSON.stringify(color)}`);
        }
        if (option.color === 'white') {
          const color = { tagId: '31', value: '0' };
          this.mqttClient.publish('UVC-EDU-02', JSON.stringify(color), { qos: 1 });
          logger.debug(`(MQTT.mqttPublish.start) ${JSON.stringify(color)}`);
        }
      }
    });
    this.mqttClient.on('close', () => {
      logger.debug('mqtt client disconnected');
    });
  }

  start(message) { // 작업 시작 버튼 클릭시
    this.mqttClient = mqtt.connect(this.host, { port: 1883 });
    this.mqttClient.on('connect', () => {
      if (message === true) {
        const payload = { tagId: '1', value: '1' };
        this.mqttClient.publish('UVC-EDU-02', JSON.stringify(payload), { qos: 1 });
        // console.log(`${JSON.stringify(payload)}`);
        logger.debug(`(MQTT.mqttPublish.start) ${JSON.stringify(payload)}`);
      }
    });
    this.mqttClient.on('close', () => {
      logger.debug('mqtt client disconnected');
    });
  }

  stop(message) { // 작업 종료 버튼 클릭시
    this.mqttClient = mqtt.connect(this.host, { port: 1883 });
    this.mqttClient.on('connect', () => {
      if (message === false) {
        const payload = { tagId: '50', value: '1' };
        this.mqttClient.publish('UVC-EDU-02', JSON.stringify(payload), { qos: 1 });
        logger.debug(`(MQTT.mqttHandler.stop) ${JSON.stringify(payload)}`);
      }
    });
    this.mqttClient.on('close', () => {
      logger.debug('mqtt client disconnected');
    });
  }

  reset(message) { // 리셋 버튼 클릭시
    this.mqttClient = mqtt.connect(this.host, { port: 1883 });
    this.mqttClient.on('connect', () => {
      if (message === true) {
        const payload = { tagId: '8', value: '1' };
        this.mqttClient.publish('UVC-EDU-02', JSON.stringify(payload), { qos: 1 });
        logger.debug(`(MQTT.mqttHandler.reset) ${JSON.stringify(payload)}`);
      }
    });
    this.mqttClient.on('close', () => {
      logger.debug('mqtt client disconnected');
    });
  }
}

module.exports = MqttHandler;
