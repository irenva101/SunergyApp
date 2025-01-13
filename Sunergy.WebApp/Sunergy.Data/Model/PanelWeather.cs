namespace Sunergy.Data.Model
{
    public class PanelWeather : Entity
    {
        public DateTime Day { get; set; }
        public int? PanelId { get; set; }
        public SolarPowerPlant Panel { get; set; }
        public DateTime? SunriseTime { get; set; }
        public DateTime? SunsetTime { get; set; }
        public double AverageTemp { get; set; }
        public double AverageCloudiness { get; set; }
        public double Produced { get; set; }
        public List<PanelWeatherHours> Hours { get; set; }

        /// <summary>
        /// Calculates the efficiency of a solar panel based on temperature and cloudiness.
        /// </summary>
        /// <param name="temp">Ambient temperature in degrees Celsius.</param>
        /// <param name="cloudiness">Cloudiness percentage (0 to 100).</param>
        /// <returns>Calculated efficiency as a percentage.</returns>
        public double GetEfficiencyOnTemp(double temp, double cloudiness)
        {
            // Constants for calculation
            const double Beta = 0.005; // Temperature coefficient
            const double CloudImpact = 0.01; // Impact of cloudiness

            // Input validation
            if (cloudiness < 0 || cloudiness > 100)
                throw new ArgumentOutOfRangeException(nameof(cloudiness), "Cloudiness must be between 0 and 100.");
            if (this.Panel?.Efficiency == null)
                throw new InvalidOperationException("Panel efficiency is not set.");

            // Temperature of the cell
            double t_celije = temp + CloudImpact * (100 - cloudiness) / 100;

            // Efficiency adjustment factor
            double f_od_T = 1 - Beta * (t_celije - 25);

            // Final efficiency calculation
            double baseEfficiency = this.Panel.Efficiency.Value / 100;
            return baseEfficiency * f_od_T * 100; // Return as percentage
        }

    }
    public class PanelWeatherHours : Entity
    {
        public int? PanelWeatherId { get; set; }
        public PanelWeather PanelWeather { get; set; }
        public DateTime Time { get; set; }
        public double Temperature { get; set; }
        public bool IsDay { get; set; }
        public double Cloudiness { get; set; }
        public double Produced { get; set; }
        public double Earning { get; set; }
        public double CurrentPrice { get; set; }
        public double SunDurationPercentage { get; set; }

        /// <summary>
        /// Calculates the percentage of sunlight duration within a specific hour 
        /// based on the provided sunrise and sunset times.
        /// </summary>
        /// <param name="sunrise">
        /// The time of sunrise for the given day (e.g., 06:30 AM).
        /// </param>
        /// <param name="sunset">
        /// The time of sunset for the given day (e.g., 07:45 PM).
        /// </param>
        /// <returns>
        /// A double value between 0 and 1 representing the percentage of sunlight duration 
        /// in the current hour:
        /// - 1: Full sunlight during the hour.
        /// - A fraction (e.g., 0.5): Partial sunlight (e.g., sunrise or sunset hour).
        /// - 0: No sunlight (hour is outside the range of sunrise and sunset).
        /// </returns>
        /// <example>
        /// For sunrise at 06:30 AM and sunset at 07:45 PM:
        /// - At 6:00 AM, returns 0.
        /// - At 6:30 AM, returns 0.5 (30 minutes of sunlight).
        /// - At 12:00 PM, returns 1 (full hour of sunlight).
        /// - At 7:30 PM, returns 0.25 (15 minutes of sunlight).
        /// - At 8:00 PM, returns 0.
        /// </example>
        public double GetDurationHour(DateTime sunrise, DateTime sunset)
        {
            if (this.Time.Hour < sunrise.Hour || this.Time.Hour > sunset.Hour)
                return 0;

            if (this.Time.Hour == sunrise.Hour)
                return (60 - sunrise.Minute) / 60.0;

            if (this.Time.Hour == sunset.Hour)
                return sunset.Minute / 60.0;

            return 1;
        }

    }
}
