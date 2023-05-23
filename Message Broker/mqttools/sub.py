import asyncio
import mqttools

topic = input("Enter topic: ")

async def subscriber():
    client = mqttools.Client('localhost', 1883)

    await client.start()
    await client.subscribe(topic)

    while True:
        message = await client.messages.get()

        if message is None:
            print('Broker connection lost!')
            break

        print(f"Topic:   {message.topic}")
        print(f"Message: {message.message}")

asyncio.run(subscriber())