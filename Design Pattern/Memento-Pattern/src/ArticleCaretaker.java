import java.util.Stack;

public class ArticleCaretaker {
    private final Stack<ArticleMemento> mementoStack=new Stack<>();

    public void addMemento(ArticleMemento memento){
        mementoStack.push(memento);
    }
    public ArticleMemento getMemento(){
        if(!mementoStack.isEmpty()){
            return mementoStack.pop();
        }
        return null;
    }
}
