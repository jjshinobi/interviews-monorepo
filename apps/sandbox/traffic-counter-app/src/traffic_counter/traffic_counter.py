from traffic_counter.traffic_data_parser import parse_traffic_data
from traffic_counter.use_cases import total_count, aggregate_by_day


def app(file_path: str):
    print(f"Reading data from: {file_path}")
    data = parse_traffic_data(file_path=file_path)

    print("Traffic stats:")
    print(f"  The number of cars seen in total: {total_count(data)}")

    print(f"  The number of cars seen per day:")
    list(
        map(
            lambda x: print(f"    {x['start_timestamp'].date()} {x['traffic_count']}"),
            aggregate_by_day(data),
        )
    )
