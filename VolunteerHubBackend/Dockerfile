#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["VolunteerHubBackend/VolunteerHubBackend.csproj", "VolunteerHubBackend/"]
RUN dotnet restore "VolunteerHubBackend/VolunteerHubBackend.csproj"
COPY . .
WORKDIR "/src/VolunteerHubBackend"
RUN dotnet build "VolunteerHubBackend.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "VolunteerHubBackend.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "VolunteerHubBackend.dll"]