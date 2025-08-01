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

def get_type(param):
    # Handle array types
    t = param.get("type", "")
    if "length" in param:
        return f"{t} ARRAY"
    return t

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
    md_lines.append("<!--- Auto-generated markdown documentation from config_map.yaml -->")
    md_lines.append("")
    md_lines.append(f"This section provides information on each of the {hw_category} configuration parameters.")
    md_lines.append("")

    for key, param in config.items():
        title = key
        md_lines.append(f"## {title}\n")
        md_lines.append("| **Field**       | **Value**      |")
        md_lines.append("|-----------------|----------------|")
        md_lines.append(f"| **Description** | {param.get('description', '')} |")
        md_lines.append(f"| **Permission**  | {permission_from_display(param.get('display', ''))} |")
        md_lines.append(f"| **Index**       | 0x{param.get('index', ''):X} |")
        md_lines.append(f"| **Scale**       | {param.get('scale', '')} |")
        md_lines.append(f"| **Type**        | {get_type(param)} |")

        # If the unit type is a bitfield, use hexadecimal display
        display_format="d"
        display_prefix=""
        if param.get('units', 'N/A') == "Bitfield":
            display_format = "05x"
            display_prefix="0x"
        
        # If the parameter is a node ID, use hexadecimal display
        if "nodeID" in key:
            display_format = "03x"
            display_prefix="0x"

        # If the parameter has a unit, include it, otherwise use 'N/A'
        if "units" in param and param.get("units") is not None:
            md_lines.append(f"| **Units**       | {param.get('units', 'N/A')} |")
        
        # If the parameter has a maximum or minimum value, include them, otherwise use 'N/A'
        if "max" in param and param.get("max") is not None:
            md_lines.append(f"| **Max**     | {display_prefix}{param.get('max', 'N/A'):{display_format}} |")
        if "min" in param and param.get("min") is not None:
            md_lines.append(f"| **Min**     | {display_prefix}{param.get('min', 'N/A'):{display_format}} |")

        # If values are present, include them
        if "values" in param and param.get("values"):
            values_string = "<ul>"
            for value, description in param.get("values").items():
                values_string = values_string + f"<li>{display_prefix}{value:{display_format}}: {description}</li>"
            values_string = values_string + "</ul> "
            md_lines.append(f"| **Values**      | {values_string} |")

        # If the parameter has a default value, include it, otherwise use 'N/A'
        if "default" in param and param.get("default") is not None:
            # Display as string if it's a string, otherwise use the display format
            if isinstance(param.get("default"), str):
                md_lines.append(f"| **Default**     | {param.get('default', 'N/A')} |")
            else:
                md_lines.append(f"| **Default**     | {display_prefix}{param.get('default', 'N/A'):{display_format}} |")
            
        md_lines.append("")

    with open(args.output_file, "w") as f:
        f.write("\n".join(md_lines))

if __name__ == "__main__":
    main()