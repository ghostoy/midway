import { Configuration, IMidwayContainer } from '@midwayjs/core';
import { ILifeCycle } from '@midwayjs/core';
import { DefaultMqttProducer } from '../../../../src';
import * as mqtt from '../../../../src';

@Configuration({
  imports: [mqtt],
  importConfigs: [
    {
      default: {
        mqtt: {
          sub: {
            test: {
              connectOptions: {
                host: '127.0.0.1',
                port: 1883,
              },
              subscribeOptions: {
                topicObject: 'test_midway',
              },
            },
          },
          pub: {
            clients: {
              default: {
                host: '127.0.0.1',
                port: 1883,
              }
            }
          },
        }
      }
    }
  ]
})
export class AutoConfiguration implements ILifeCycle {
  async onReady() {
    console.log('onReady');
  }

  async onServerReady(container: IMidwayContainer) {
    const producer = await container.getAsync(DefaultMqttProducer);
    console.log('onServerReady and send message');
    await producer.publishAsync('test_midway', 'hello world', {
      qos: 2
    });
  }
}
