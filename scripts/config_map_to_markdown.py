# converts
# contactorConfigTypes:
#     description: Contactor Type Configuration
#     display: user
#     index: 0x61
#     scale: 1
#     type: UINT32
#     units: Bitfield

# to
#### Maximum Temperature of the BMU

# | **Field**       | **Value**      |
# |-----------------|----------------|
# | **Description** | The maximum temperature threshold of the BMU |
# | **Permission**  | User           |
# | **Index**       | 0x56           |
# | **Scale**       | 0.1            |
# | **Type**        | INT16          |
# | **Units**       | °C             |
import argparse
import yaml

def permission_from_display(display):
    # Map display to permission string
    if display == "admin":
        return "Admin"
    elif display == "user":
        return "User"
    else:
        return "Read Only"

def get_units(units):
    # Normalize units for markdown
    if units is None or units == "":
        return "NA"
    return units

def get_type(param):
    # Handle array types
    t = param.get("type", "")
    if "length" in param:
        return f"{t} ARRAY"
    return t

def get_length(param):
    # Return length if present
    return param.get("length", None)

def main():
    parser = argparse.ArgumentParser(description="Converter for config_map.yaml to markdown for documentation purposes")
    parser.add_argument("-i", "--input_file", help = "Specifies the input yaml config file", type=str, required=True)
    parser.add_argument("-o", "--output_file", help = "Specifies the output markdown file", type=str, required=True)
    args = parser.parse_args()

    with open(args.input_file, "r") as f:
        data = yaml.safe_load(f)

    config = data.get("config", {})

    hw_name = data.get("hw_name", "Unknown")
    hw_category = data.get("hw_category", "Unknown")
    md_lines = ["---"]
    md_lines.append(f"title: Prohelion {hw_category} {hw_name} - Configuration Parameters")
    md_lines.append("---")
    md_lines.append("")
    md_lines.append(f"This section provides information on each of the {hw_category} configuration parameters.")
    md_lines.append("")

    for key, param in config.items():
        title = key
        md_lines.append(f"### {title}\n")
        md_lines.append("| **Field**       | **Value**      |")
        md_lines.append("|-----------------|----------------|")
        md_lines.append(f"| **Description** | {param.get('description', '')} |")
        md_lines.append(f"| **Permission**  | {permission_from_display(param.get('display', ''))} |")
        md_lines.append(f"| **Index**       | 0x{param.get('index', ''):X} |")
        md_lines.append(f"| **Scale**       | {param.get('scale', '')} |")
        md_lines.append(f"| **Type**        | {get_type(param)} |")
        if get_length(param):
            md_lines.append(f"| **Length**      | {get_length(param)} |")
        md_lines.append(f"| **Units**       | {get_units(param.get('units', ''))} |")
        md_lines.append(f"| **Default**     | {param.get('default', 'NA')} |")
        md_lines.append("")

    with open(args.output_file, "w") as f:
        f.write("\n".join(md_lines))

if __name__ == "__main__":
    main()