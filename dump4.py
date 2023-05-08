import os

def recurse_directory(path, filelist, allowed_subdirs=None):
    for root, dirs, files in os.walk(path):
        relative_root = os.path.relpath(root, path)
        if allowed_subdirs is not None and not any(relative_root.startswith(subdir) for subdir in allowed_subdirs) and relative_root != '.':
            continue

        for file in files:
            if file in filelist:
                relative_dir = os.path.relpath(root, path)
                process_file(os.path.join(root, file), relative_dir, file)

def process_file(file_path, relative_dir, filename):
    with open(file_path, 'r') as file:
        content = file.read()
    print(f'/** BEGIN: {relative_dir}/{filename} **/\n')
    print(content)
    print(f'/** END: {relative_dir}/{filename} **/\n')
    print()

if __name__ == '__main__':
    script_directory = os.path.dirname(os.path.abspath(__file__))
    #filelist = ['index.tsx', 'RadiusInput.tsx', 'Map.tsx', 'ConnectorFilters.tsx', 'TotalStationsCount.tsx']
    filelist = ['api.ts', 'chargingStations.js', 'chargingStationsApi.ts']
    allowed_subdirs = ['pages', 'components', 'lib']  # Replace with your list of allowed subdirectories
    recurse_directory(script_directory, filelist, allowed_subdirs)
