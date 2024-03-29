describe('RabbitMQ Message Test', () => {
  it('should send a message to the queue and receive it', async () => {
    // Send a message to RabbitMQ
    cy.exec('node cypress/AMQPFunction/sendMessage.js').then((result) => {
      expect(result.code).to.eq(0);
    });

    // Wait for a short period to ensure the message can be consumed
    cy.wait(5000); // Adjust time based on your environment's needs

    // Attempt to receive the message
    cy.exec('node cypress/AMQPFunction/receiveMessage.js', {timeout: 10000}).then((result) => {
      expect(result.stdout).to.include('Hello RabbitMQ');
    });
  });
});
