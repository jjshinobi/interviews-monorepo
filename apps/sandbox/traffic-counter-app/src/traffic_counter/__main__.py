from traffic_counter.traffic_counter import app

import argparse


def parse_args():
    parser = argparse.ArgumentParser(description="Traffic counter")
    parser.add_argument("--file", type=str, required=True, help="Path to the traffic data file")
    return parser.parse_args()


if __name__ == "__main__":
    args = parse_args()
    app(file_path=args.file)
