import cantools
import sys
import os
import re

def camel_to_spaces(camel_string):
  """
  Converts a camel case string to a space-separated string.

  Args:
    camel_string: The input string in camel case.

  Returns:
    The string with spaces inserted between words.
  """
  # Find all occurrences where a lowercase letter is followed by an uppercase letter
  # and insert a space between them.
  # The \1 and \2 refer to the captured groups ([a-z]) and ([A-Z]) respectively.
  # Account for special words and numbers present in Prohelion DBC files
  spaced_string = re.sub(r'SoC([A-Z])', r'SoC \1', camel_string)
  spaced_string = re.sub(r'SoP([A-Z])', r'SoP \1', spaced_string)
  spaced_string = re.sub(r'BMS([A-Z])', r'BMS \1', spaced_string)
  spaced_string = re.sub(r'([0-9])([A-Z])', r'\1 \2', spaced_string)
  spaced_string = re.sub(r'([a-z])([0-9])', r'\1 \2', spaced_string)
  spaced_string = re.sub(r'([a-z])([A-Z][a-z])', r'\1 \2', spaced_string)
  return spaced_string

def dbc_to_markdown_table(dbc_file_path, output_md_path):
    db = cantools.database.load_file(dbc_file_path)

    device_name = db.nodes[0].name if db.nodes else "Unknown Device"

    md_lines = ["---"]
    md_lines.append(f"title: {device_name} - DBC Messages and Signals")
    md_lines.append("\n---\n")

    md_lines.append(f"# {device_name} - DBC Messages and Signals\n")

    md_lines.append(f"This section provides information on the CAN bus messages and signals used in the {device_name}. Each message is identified by its unique ID, and the structure, including signals, is described.\n")
    md_lines.append('***Note!*** *"Default BASE ID" The following Message IDs assume a default CAN Bus BASE ID of `0x600`. The BASE ID of each device is configurable via the device configuration. If the BASE ID has been configured differently on the device, make sure to account for the shift in the Message IDs. The Message ID offsets from the BASE ID will remain the same regardless of the device configuration.*\n')

    
    md_lines.append("\n## Contents\n")
    md_lines.append("| Message ID | Name |")
    md_lines.append("|----------|--------|")

    for message in db.messages:
        name = message.name
        if 'Node01' in name:
            name = message.name.replace('Node01', 'Node𝒩')
        elif re.search(r'Node[0-3][0-9]', message.name, flags=0) is not None:
            continue

        ref = name.lower()
        md_lines.append(f"| **{hex(message.frame_id)}** | [{camel_to_spaces(name)}](#{ref})|")

    md_lines.append("\n---\n")
    for message in db.messages:
        name = message.name
        frame_id = f"{hex(message.frame_id)} ({message.frame_id})"
        if 'Node01' in message.name:
            description = f"  \n\n**Note!** *For brevity, node messages are described once, where &#x1D4A9; describes the node number (up to a maximum of 32 nodes).*\n"
            name = message.name.replace('Node01', 'Node&#x1D4A9;') + description
            frame_id = f"{hex(message.frame_id)} + (&#x1D4A9; &times; 0x7)"

        elif re.search(r'Node[0-3][0-9]', message.name, flags=0) is not None:
            continue

        md_lines.append(f"## {name}")
        md_lines.append(f"- ID: {frame_id}")
        md_lines.append(f"- Length: {message.length}")
        md_lines.append(f"- Senders: {', '.join(message.senders) if message.senders else 'N/A'}")
        md_lines.append(f"- Comment: {message.comment if message.comment else 'None'}\n")

        # Table header
        md_lines.append("| Name | Comment&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| Unit | Start Bit | Length | Signed | Scale | Offset | Min | Max | Byte Order |")
        md_lines.append("|------|---------------------------|---|--------|------------|--------|-------|--------|-----|-----|------|")

        for signal in message.signals:
            signal_name = signal.name

            # If Node messages present, only include the first and label as Node𝒩 rather than include all messages
            if 'Node01' in message.name:
                signal_name = signal.name.replace('Node01', 'Node&#x1D4A9;')
            
            # If values are present for the signal, include them
            values_string = ""
            if signal.choices:
                values_string = "<ul>"
                for choice in signal.choices:
                    values_string = values_string + f"<li>{choice}: {signal.choices[choice]}</li>"
                values_string = values_string + "</ul> "

            # Create the markdown line detailing the signal
            md_lines.append(
                f"| {signal_name} | {signal.comment if signal.comment else ''} {values_string} | "
                f"{signal.unit if signal.unit else ''} | "
                f"{signal.start} | {signal.length} | "
                f"{signal.is_signed} | {signal.scale} | {signal.offset} | "
                f"{signal.minimum if signal.minimum is not None else 'N/A'} | "
                f"{signal.maximum if signal.maximum is not None else 'N/A'} | "
                f"{signal.byte_order} |"
            )
        md_lines.append("\n---\n")
    with open(output_md_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(md_lines))

    print(f"Markdown documentation with tables generated at: {output_md_path}")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Description: This script takes in a Prohelion DBC file and converts it to a markdown format for use in documentation\n" + 
        "Usage: python dbc_to_markdown_table.py <input_dbc_file> <output_md_file>")
    else:
        dbc_file = sys.argv[1]
        output_md = sys.argv[2]
        if os.path.exists(dbc_file):
            dbc_to_markdown_table(dbc_file, output_md)
        else:
            print(f"Error: File '{dbc_file}' not found.")
