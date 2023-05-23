import paho.mqtt.client as mqtt

# MQTT broker configuration
broker = "localhost"
port = 1883
topic = input("Enter the topic: ")
msg = input("Enter the message: ")

# Create a MQTT client
client = mqtt.Client()

# Connect to the MQTT broker
client.connect(broker, port)

# Publish a message
message = msg
client.publish(topic, message)

# Disconnect from the MQTT broker
client.disconnect()
