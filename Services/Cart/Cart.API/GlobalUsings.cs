
global using Grpc.Core;
global using GrpcCart;
global using Me.Services.Cart.API.IntegrationEvents.EventHandlers;
global using Me.Services.Cart.API.IntegrationEvents.Events;
global using Me.Services.Cart.API.Model;
global using Me.Services.Cart.API.Repositories;
global using Me.Services.Cart.API.Services;
global using Me.Services.Common;
global using Me.Services.EventBus.Abstractions;
global using Me.Services.EventBus.Events;
global using Microsoft.AspNetCore.Authorization;
global using Microsoft.AspNetCore.Http;
global using Microsoft.AspNetCore.Mvc;
global using StackExchange.Redis;
global using System.ComponentModel.DataAnnotations;
global using System.Text.Json;