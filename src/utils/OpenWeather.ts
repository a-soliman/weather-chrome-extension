export module OpenWeather {
  export interface OpenWeatherResponse {
    name: string;
    weather: {
      description: string;
      icon: string;
      id: number;
      main: string;
    }[];
    wind: {
      deg: number;
      speed: number;
    };
    main: {
      feelsLike: number;
      humidity: number;
      pressure: number;
      temp: number;
      tempMax: number;
      tempMin: number;
    };
  }

  export class OpenWeatherData {
    private name: string;
    private weather: {
      description: string;
      icon: string;
      id: number;
      main: string;
    }[];
    private wind: {
      deg: number;
      speed: number;
    };
    private main: {
      feelsLike: number;
      humidity: number;
      pressure: number;
      temp: number;
      tempMax: number;
      tempMin: number;
    };
    constructor(rowResponse: any) {
      this.name = rowResponse.name;
      this.weather = rowResponse.weather;
      this.wind = rowResponse.wind;

      this.main = {
        feelsLike: rowResponse.main.feels_like,
        humidity: rowResponse.main.humidity,
        pressure: rowResponse.main.pressure,
        temp: rowResponse.main.temp,
        tempMax: rowResponse.main.temp_max,
        tempMin: rowResponse.main.temp_min,
      };
    }

    get values(): OpenWeatherResponse {
      const { name, weather, wind, main } = this;
      return { name, weather, wind, main };
    }
  }
}
