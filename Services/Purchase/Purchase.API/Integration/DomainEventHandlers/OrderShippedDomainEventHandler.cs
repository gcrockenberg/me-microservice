﻿namespace Me.Services.Purchase.API.Integration.DomainEventHandlers;

public class OrderShippedDomainEventHandler
                : INotificationHandler<OrderShippedDomainEvent>
{
    private readonly IOrderRepository _orderRepository;
    private readonly IBuyerRepository _buyerRepository;
    private readonly IPurchaseIntegrationEventService _purchaseIntegrationEventService;
    private readonly ILogger _logger;

    public OrderShippedDomainEventHandler(
        IOrderRepository orderRepository,
        ILogger<OrderShippedDomainEventHandler> logger,
        IBuyerRepository buyerRepository,
        IPurchaseIntegrationEventService purchaseIntegrationEventService)
    {
        _orderRepository = orderRepository ?? throw new ArgumentNullException(nameof(orderRepository));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _buyerRepository = buyerRepository ?? throw new ArgumentNullException(nameof(buyerRepository));
        _purchaseIntegrationEventService = purchaseIntegrationEventService;
    }

    public async Task Handle(OrderShippedDomainEvent domainEvent, CancellationToken cancellationToken)
    {
        PurchaseApiTrace.LogOrderStatusUpdated(_logger, domainEvent.Order.Id, nameof(OrderStatus.Shipped), OrderStatus.Shipped.Id);

        var order = await _orderRepository.GetAsync(domainEvent.Order.Id, true, true);
        var buyer = order.Buyer;

        var integrationEvent = new OrderStatusChangedToShippedIntegrationEvent(order.Id, order.OrderStatus.Name, buyer.Name);
        await _purchaseIntegrationEventService.AddAndSaveEventAsync(integrationEvent);
    }
}
