from datetime import datetime

from traffic_counter.entities import TrafficCount
from traffic_counter.use_cases import total_count, aggregate_by_day, top_x_traffic_count


def test_total_count():
    data: list[TrafficCount] = [
        {
            "start_timestamp": datetime.fromisoformat("2016-12-01T05:00:00"),
            "traffic_count": 5,
        },
        {
            "start_timestamp": datetime.fromisoformat("2016-12-01T06:00:00"),
            "traffic_count": 10,
        },
        {
            "start_timestamp": datetime.fromisoformat("2016-12-01T07:00:00"),
            "traffic_count": 15,
        },
    ]

    assert total_count(data) == 30


def test_aggregate_by_day():
    data: list[TrafficCount] = [
        {
            "start_timestamp": datetime.fromisoformat("2016-12-01T05:00:00"),
            "traffic_count": 5,
        },
        {
            "start_timestamp": datetime.fromisoformat("2016-12-01T06:00:00"),
            "traffic_count": 10,
        },
        {
            "start_timestamp": datetime.fromisoformat("2016-12-02T07:00:00"),
            "traffic_count": 15,
        },
    ]

    result = aggregate_by_day(data)

    assert len(result) == 2

    assert result[0]["start_timestamp"].isoformat() == "2016-12-01T00:00:00"
    assert result[0]["traffic_count"] == 15

    assert result[1]["start_timestamp"].isoformat() == "2016-12-02T00:00:00"
    assert result[1]["traffic_count"] == 15


def test_x_traffic_count():
    data: list[TrafficCount] = [
        {
            "start_timestamp": datetime.fromisoformat("2016-12-01T05:00:00"),
            "traffic_count": 5,
        },
        {
            "start_timestamp": datetime.fromisoformat("2016-12-01T06:00:00"),
            "traffic_count": 10,
        },
        {
            "start_timestamp": datetime.fromisoformat("2016-12-02T07:00:00"),
            "traffic_count": 15,
        },
    ]

    result = top_x_traffic_count(data, 2)

    assert len(result) == 2

    assert result[0]["start_timestamp"].isoformat() == "2016-12-02T07:00:00"
    assert result[0]["traffic_count"] == 15

    assert result[1]["start_timestamp"].isoformat() == "2016-12-01T06:00:00"
    assert result[1]["traffic_count"] == 10
