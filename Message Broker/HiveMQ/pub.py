import paho.mqtt.client as mqtt

# Define MQTT broker host and port
broker_host = "broker.hivemq.com"
broker_port = 1883

# Create MQTT client
client = mqtt.Client()

# Connect to MQTT broker
client.connect(broker_host, broker_port)

# Publish a message to a topic
topic = input("Enter topic: ")
message = input("Enter message: ")
client.publish(topic, message)

# Disconnect from MQTT broker
client.disconnect()
