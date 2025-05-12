from traffic_counter.utils import split_into_sliding_windows


def test_split_into_sliding_windows():
    data = [1, 2, 3, 4, 5]
    expected_result = [[1, 2], [2, 3], [3, 4], [4, 5]]
    assert split_into_sliding_windows(data, 2) == expected_result

    data = [1, 2, 3, 4, 5]
    expected_result = [[1, 2, 3], [2, 3, 4], [3, 4, 5]]
    assert split_into_sliding_windows(data, 3) == expected_result
