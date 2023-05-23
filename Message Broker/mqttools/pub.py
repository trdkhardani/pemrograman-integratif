import asyncio
import mqttools

topic = input("Enter topic: ")
msg = input("Enter message: ")

async def publisher():
    async with mqttools.Client('localhost', 1883) as client:
        client.publish(mqttools.Message(topic, msg.encode()))

asyncio.run(publisher())