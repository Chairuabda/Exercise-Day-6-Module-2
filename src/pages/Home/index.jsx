import { Box, Text } from "@chakra-ui/react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Button, Checkbox } from "@chakra-ui/react";
import { ListItem, UnorderedList } from "@chakra-ui/react";
import { useState } from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import { withTheme } from "@emotion/react";

export default function Home(todo) {
	const [input, setInput] = useState("");
	const [list, setList] = useState([]);
	const [completedCount, setCompletedCount] = useState(0);

	const takeValue = (prop) => {
		setInput(prop.target.value);
	};
	const addValue = (event) => {
		event.preventDefault();
		if (input.trim() !== "") {
			const newTask = { text: input, completed: false };
			setList([...list, newTask]);
			setInput("");
		}
	};

	const deleteTodo = (index) => {
		const newList = [...list];
		newList.splice(index, 1);
		setList(newList);
		setCompletedCount();
	};

	const handleCheckBoxChange = (index) => {
		const updatedList = [...list];
		updatedList[index] = {
			...updatedList[index],
			completed: !updatedList[index].completed,
		};
		setList(updatedList);
		const completedTask = updatedList.filter(
			(task) => task.completed
		);
		setCompletedCount(completedTask.length);
	};

	return (
		<Box
			display={"flex"}
			alignItems={"center"}
			justifyContent={"center"}
			h={"100vh"}
			w={"100vw"}
			color={"white"}
			bgColor={{ base: "#d4d8f0" }}
		>
			<Box
				display={"flex"}
				alignItems={"center"}
				justifyContent={"space-between"}
				flexDirection={"column"}
				bgColor={"#232946"}
				p={"30px"}
				w={{ md: "lg", sm: "sm", base: "80%" }}
				h={{ md: "xl", sm: "md", base: "md" }}
				borderRadius={"20px"}
			>
				<Box
					display={"flex"}
					alignItems={"center"}
					justifyContent={"center"}
					flexDirection={"column"}
					w={"80%"}
				>
					<Box>
						<Text>Choros ToDo List</Text>
					</Box>
					<Box w={"100%"} mt={"20px"}>
						{list?.length > 0 ? (
							<UnorderedList w={"100%"} ml={"0"}>
								{list.map((task, index) => (
									<Box
										display={"flex"}
										w={"100%"}
										alignItems={"Center"}
										mt={"10px"}
										key={index}
									>
										<Box flexGrow={"100"} display={"flex"}>
											<Checkbox
												mr={"10px"}
												border={"green"}
												onChange={() => handleCheckBoxChange(index)}
												checked={task.completed}
											/>

											<ListItem
												key={index}
												flexGrow={"2"}
												listStyleType={"none"}
												textAlign={"start"}
											>
												{task.text}
											</ListItem>
										</Box>
										<Button
											onClick={() => {
												deleteTodo(index);
											}}
											flexGrow={"1"}
											w={"10px"}
											border={"1px solid red"}
											bgColor={"transparent"}
										>
											{" "}
											<DeleteIcon color={"red"} />
										</Button>
									</Box>
								))}
							</UnorderedList>
						) : (
							<Box>
								<Text>Add ToDo</Text>
							</Box>
						)}
					</Box>
				</Box>
				<Box
					display={"flex"}
					alignItems={"center"}
					justifyContent={"center"}
					flexDirection={"column"}
				>
					<Box>
						<Text>Done {completedCount}</Text>
					</Box>
					<Box
						display={"flex"}
						flexDirection={"column"}
						justifyContent={"center"}
						w={{ md: "md", sm: "xsm" }}
					>
						<form onSubmit={addValue}>
							<FormControl>
								<FormLabel ml={"5px"}>Add todo</FormLabel>
								<Input
									type={"text"}
									placeholder={"Add todo"}
									value={input}
									onChange={takeValue}
								/>
								<Box
									display={"flex"}
									alignItems={"center"}
									mt={"20px"}
								>
									<Button
										type="submit"
										colorScheme={"blue"}
										onClick={addValue}
										color={"black"}
										fontWeight={700}
									>
										ADD TASK
									</Button>
								</Box>
							</FormControl>
						</form>
					</Box>
				</Box>
			</Box>
		</Box>
	);
}
