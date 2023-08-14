global using Azure.Identity;
global using Dapper;
global using FluentValidation;
global using Grpc.Core;
global using Grpc.Core.Interceptors;
global using GrpcCart;
global using Me.Services.Common;
global using Me.Services.EventBus.Abstractions;
global using Me.Services.EventBus.Extensions;
global using Me.Services.EventBus.Events;
global using Me.Services.EventBus.IntegrationEventLogEF;
global using Me.Services.EventBus.IntegrationEventLogEF.Services;
global using Me.Services.Purchase.API;
global using Me.Services.Purchase.API.Data;
global using Me.Services.Purchase.API.Data.DTOs;
global using Me.Services.Purchase.API.Data.Models;
global using Me.Services.Purchase.API.Data.Queries;
global using Me.Services.Purchase.API.Extensions;
global using Me.Services.Purchase.API.Grpc;
global using Me.Services.Purchase.API.Integration;
global using Me.Services.Purchase.API.Integration.DomainEventHandlers;
global using Me.Services.Purchase.API.Integration.Events;
global using Me.Services.Purchase.API.Integration.EventHandlers;
global using Me.Services.Purchase.API.Services;
global using Me.Services.Purchase.API.MediatR.Behaviors;
global using Me.Services.Purchase.API.MediatR.Commands;
global using Me.Services.Purchase.API.MediatR.Validations;
global using Me.Services.Purchase.Domain.Exceptions;
global using Me.Services.Purchase.Domain.Events;
global using Me.Services.Purchase.Domain.AggregatesModel.BuyerAggregate;
global using Me.Services.Purchase.Domain.AggregatesModel.OrderAggregate;
global using Me.Services.Purchase.Domain.SeedWork;
global using Me.Services.Purchase.Infrastructure;
global using Me.Services.Purchase.Infrastructure.Repositories;
global using Me.Services.Purchase.Infrastructure.Idempotency;
global using Me.Services.Purchase.API.Repositories;
global using MediatR;
global using Microsoft.AspNetCore.Authorization;
global using Microsoft.AspNetCore.Mvc;
global using Microsoft.EntityFrameworkCore;
global using Microsoft.EntityFrameworkCore.Design;
global using Microsoft.EntityFrameworkCore.Infrastructure;
global using Microsoft.Extensions.Options;
global using Microsoft.Identity.Web.Resource;
global using MySqlConnector;
global using Polly;
global using Polly.Retry;
global using StackExchange.Redis;
global using System.Data.Common;
global using System.Data.SqlClient;
global using System.Runtime.Serialization;
global using System.Text.Json;
global using System.Text.Json.Serialization;