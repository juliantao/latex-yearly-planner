#!/usr/bin/env bash
#
PLANNER_YEAR=2023 \
PASSES=2 \
CFG="cfg/base.yaml,cfg/rm2.base.yaml,cfg/rm2_ddvk.base.yaml,cfg/template_months_on_side.yaml,cfg/rm2.mos.default.dailycal.yaml" \
NAME="rm2_ddvk.mos.default.dailycal" \
./single.sh
