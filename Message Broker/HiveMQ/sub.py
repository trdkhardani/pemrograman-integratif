import paho.mqtt.client as mqtt

# Define MQTT broker host and port
broker_host = "broker.hivemq.com"
broker_port = 1883

# Callback function when a message is received
def on_message(client, userdata, message):
    print("Received message:", str(message.payload.decode()))

# Create MQTT client
client = mqtt.Client()

# Connect to MQTT broker
client.connect(broker_host, broker_port)

# Set the callback function for message reception
client.on_message = on_message

# Subscribe to a topic
topic = input("Enter topic: ")
client.subscribe(topic)

# Start the MQTT client loop to process incoming messages
client.loop_start()

# Keep the subscriber script running until interrupted
try:
    while True:
        pass
except KeyboardInterrupt:
    client.loop_stop()
    client.disconnect()
