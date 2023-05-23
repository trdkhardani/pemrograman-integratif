import paho.mqtt.client as mqtt

# MQTT broker configuration
broker = "localhost"
port = 1883
topic = input("Enter the topic: ")

# Callback function when a message is received
def on_message(client, userdata, msg):
    print("Received message: " + msg.payload.decode())

# Create a MQTT client
client = mqtt.Client()

# Set the callback function for message reception
client.on_message = on_message

# Connect to the MQTT broker
client.connect(broker, port)

# Subscribe to the topic
client.subscribe(topic)

# Start the MQTT network loop
client.loop_start()

# Keep the script running to receive messages
while True:
    pass

# Disconnect from the MQTT broker
client.disconnect()
