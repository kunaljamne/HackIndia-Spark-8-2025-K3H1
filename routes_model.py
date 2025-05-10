import pandas as pd
import os

DATA_PATH = os.path.join("data", "cleaned_routes.csv")
df = pd.read_csv(DATA_PATH)

def get_indian_airports():
    indian_routes = df[df['source_country'] == 'India']
    return sorted(indian_routes['source_airport'].unique().tolist())

def suggest_routes(source, destination):
    routes = df[
        (df['source_airport'] == source) & (df['destination_airport'] == destination)
    ].sort_values(by='price', ascending=True)

    if routes.empty:
        raise ValueError("No routes found between specified airports.")

    return routes[['airline', 'source_airport', 'destination_airport', 'price', 'distance']].to_dict(orient='records')