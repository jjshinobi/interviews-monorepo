import os

from traffic_counter.entities import TrafficCount
from traffic_counter.traffic_data_parser import parse_traffic_data


def test_traffic_data_parser():
    file_path = os.path.join(os.path.dirname(__file__), "traffic_data.txt")
    result: list[TrafficCount] = parse_traffic_data(file_path=file_path)

    assert len(result) == 24

    assert result[0]["start_timestamp"].isoformat() == "2016-12-01T05:00:00"
    assert result[0]["traffic_count"] == 5

    assert result[len(result)-1]["start_timestamp"].isoformat() == "2016-12-09T00:00:00"
    assert result[len(result)-1]["traffic_count"] == 4
