#!/usr/bin/env bash
#
PLANNER_YEAR=2023 \
PASSES=2 \
CFG="cfg/base.yaml,cfg/template_months_on_side.yaml,cfg/sn_a5x.mos.default.yaml" \
./single.sh
