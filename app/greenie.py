from app import app # importing app initialization from root nodule 
from icecream import ic
from flask import jsonify
import psutil
import wmi
import pythoncom


# GET ALL 
@app.route('/get/power-consumption/all', methods=['GET'])
def get_power_data():

    ic('Getting all power consumption data..')

    all_power_data = []

    try:
        cpu_percent = psutil.cpu_percent(interval=1)
        print(f'over all CPU usage: {cpu_percent}')

        for process in psutil.process_iter(['pid', 'name']):
            pid = process.info['pid']
            name = process.info['name']

            # power consumption relative to over all CPU usage 
            power_consumption = process.cpu_percent(interval=1) / cpu_percent
            print(f'cpu usage count: {power_consumption}')

            # Retrieve power consumption data for the running applications
            all_power_data.append({
                'pid': pid,
                'name': name,
                'power_consumption': power_consumption,
            })

        return jsonify(data=all_power_data), 200
    
    except Exception as err:
        ic(f'error occurred: {err}')
        return jsonify(error='Error in getting all power consumption data'), 400

# GET SPECIFIC 
@app.route('/get/power-consumption/<pid>', methods=['GET'])
def specific_power_consumption(pid):
    print(f'Getting power consumption data for: {pid}, type {type(pid)}')

    power_data = {}

    try:
        process = psutil.Process(int(pid))
        print(f'process data: {process}')
        power_data['pid'] = process.pid
        power_data['name'] = process.name()
        power_data['status'] = process.status()

    except psutil.NoSuchProcess:
        return jsonify(error='No such process found!!'), 400 
    
    return jsonify(data=power_data), 200 