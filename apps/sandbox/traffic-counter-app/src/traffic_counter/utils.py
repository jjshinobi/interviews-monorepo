from typing import TypeVar

T = TypeVar("T")


def split_into_sliding_windows(data: list[T], window_size: int) -> list[list[T]]:
    """
    Split the traffic data into windows of a given size.

    Args:
        data (list): A list of objects.
        window_size (int): The size of each window.

    Returns:
        list: A list of lists, where each inner list is a window of objects of window size.
    """
    return [data[i : i + window_size] for i in range(len(data) - window_size + 1)]
