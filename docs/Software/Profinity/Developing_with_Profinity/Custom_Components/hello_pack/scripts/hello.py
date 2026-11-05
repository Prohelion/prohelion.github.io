import time

_run_count = 0

def on_start():
    global _run_count
    _run_count = 0
    return True

def run():
    global _run_count
    while not Profinity.ScriptCancelled:
        _run_count = _run_count + 1
        Profinity.Tags.SetValue("count", _run_count)
        time.sleep(1)
    return True
