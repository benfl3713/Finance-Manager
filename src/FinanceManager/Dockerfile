# Setup Environment
FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build-env
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash - \ 
	&& apt update \
	&& apt install -y nodejs
WORKDIR /app

COPY ./ ./
WORKDIR /app/FinanceManager/
RUN dotnet restore

#Setup Ng
WORKDIR /app/FinanceManager/ClientApp
RUN npm link @angular/cli
RUN npm install

# Build
WORKDIR /app/FinanceManager/
RUN dotnet publish -c Release -o /app/FinanceManager/deploy

# Generate runtime image
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1
WORKDIR /app
COPY --from=build-env /app/FinanceManager/deploy .
EXPOSE 80
ENTRYPOINT ["dotnet", "FinanceManager.dll"]