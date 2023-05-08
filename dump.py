import os
import sys

def print_ts_files(output_file=None):
    """
    Recursively print the content of all *.ts and *.tsx files
    in the 'components', 'pages', and 'lib' directories (direct subfolders only),
    excluding files that start with '_', with a comment at the beginning of
    each file indicating its parent directory and filename, and an empty
    line after each file. Optionally, if an output_file is provided, the
    printed contents will be written to that file instead of being printed
    to the console. Assumes the input directory is the same directory as
    the script.
    """
    input_dir = os.path.dirname(os.path.abspath(sys.argv[0]))
    if output_file:
        output_file = os.path.join(input_dir, output_file)
    for dir_name in ['components', 'pages', 'lib']:
        dir_path = os.path.join(input_dir, dir_name)
        if os.path.isdir(dir_path):
            for file_name in os.listdir(dir_path):
                if file_name.endswith(('.ts', '.tsx','.js','.jsx')) and not file_name.startswith('_'):
                    print(f"//{dir_name}/{file_name}")
                    file_path = os.path.join(dir_path, file_name)
                    with open(file_path, 'r') as f:
                        print(f.read())
                    print()
    if output_file:
        with open(output_file, 'w') as out_f:
            sys.stdout = out_f
            print_ts_files()
            sys.stdout = sys.__stdout__
            print(f"Printed file contents to {output_file}")

# Example usage:
print_ts_files(output_file='output.txt')
