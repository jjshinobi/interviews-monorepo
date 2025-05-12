from traffic_counter.traffic_data_parser import parse_traffic_data
from traffic_counter.use_cases import total_count, aggregate_by_day, top_x_traffic_count


def app(file_path: str):
    print(f"Reading traffic data from: {file_path}")
    traffic_data = parse_traffic_data(file_path=file_path)

    print("Traffic stats:")
    print(
        f"  The number of cars seen in total: {total_count(traffic_data=traffic_data)}"
    )

    print(f"  The number of cars seen per day:")
    list(
        map(
            lambda x: print(f"    {x['start_timestamp'].date()} {x['traffic_count']}"),
            aggregate_by_day(traffic_data=traffic_data),
        )
    )

    print(f"  Top 3 half hours with most cars:")
    list(
        map(
            lambda x: print(f"    {x['start_timestamp']} {x['traffic_count']}"),
            top_x_traffic_count(traffic_data, x=3),
        )
    )
